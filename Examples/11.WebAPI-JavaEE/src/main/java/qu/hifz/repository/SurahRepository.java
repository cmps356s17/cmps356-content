package qu.hifz.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.google.gson.Gson;

import qu.hifz.entity.Surah;
import qu.utils.Utils;

public class SurahRepository {

	private EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("CmsDbPu");
	private EntityManager em;
	
	public SurahRepository() {
		em = entityManagerFactory.createEntityManager();
		loadSurahs(); 
	}

	/*ToDo in the Lab:
	 * Implement the following methods
	 * getSurah(int id) => returns Surah by id
	 * getSurahs(string type) => returns Surahs by type
	 * getSurahsStats()  => returns number of surahs and total number of ayat for Meccan and Medinan surahs
	 * updateSurah(Surah sura) => update surah details to fix any data entry error
	 * 
	 * Provide access to these methods via Web API
	 */
	
	public List<Surah> getSurahs() {
		Query query = em.createQuery("select s from Surah s");
		return query.getResultList();
	}

	public List<Surah> getSurahsJpaSQL() {
		String sqlText = "Select * from Surah";
		return em.createNativeQuery(sqlText, Surah.class).getResultList();
	}
	
	public List<Surah> getSurahsJDBC() throws ClassNotFoundException, SQLException {
		List<Surah> surahs = new ArrayList<>();
		String connectionURL = "jdbc:derby:memory:cmsdb;create=true";
		Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
		
		//try-with-resources statement declares the resources and ensures that each resource is closed at the end of the statement. 
		try (Connection dbConnection = DriverManager.getConnection(connectionURL);
				Statement statement = dbConnection.createStatement() ) {

			String sqlText = "Select * from Surah";
			ResultSet rs = statement.executeQuery(sqlText);
	
			int count = 0;
			while (rs.next()) {
				++count;
				int id = rs.getInt("id");
				String name = rs.getString("name");
				String englishName = rs.getString("englishName");
				int ayaCount = rs.getInt("ayaCount");
				String type = rs.getString("type");
	
				Surah surah = new Surah(id, name, englishName, ayaCount, type);
				surahs.add(surah);
			}
			System.out.println("getSurahsJDBC - Results Count : " + count);
		}
		return surahs;
	}

	public Surah addSurah(Surah sura) {
		EntityTransaction tx = em.getTransaction();
		try {
			tx.begin();
			em.persist(sura);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			throw e;
		}
		return sura;
	}

	//@PostLoad = This method will be auto-executed after the object is instantiated but does not work with Jetty
	//@PostLoad
	public void loadSurahs() {
		// Only load Surahs to the database and the Surah table is empty
		int surahCount = ((Long) em.createQuery("select count(s.id) from Surah as s").getSingleResult()).intValue();
		if (surahCount > 0)
			return;

		String surahsUrl = "https://cmps356s17.github.io/data/surah.json";
		Gson gson = new Gson();
		String surahsStr = Utils.readUrl(surahsUrl);
		System.out.println(surahsStr);

		Surah[] surahArray = gson.fromJson(surahsStr, Surah[].class);
		List<Surah> surahs = new ArrayList<>(Arrays.asList(surahArray));

		surahs.forEach(sura -> addSurah(sura));
	}
}