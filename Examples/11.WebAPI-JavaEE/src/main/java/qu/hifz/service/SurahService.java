package qu.hifz.service;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import qu.hifz.entity.Surah;
import qu.hifz.repository.SurahRepository;

@Path("/api/surahs")
public class SurahService {
    SurahRepository surahRepository;

    public SurahService() {
    	this.surahRepository = new SurahRepository();
    }
    
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<Surah> getContacts() {
        return surahRepository.getSurahs();
    }
    
    @Path("/jdbc")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<Surah> getSurahsJDBC() throws ClassNotFoundException, SQLException {
        return surahRepository.getSurahsJDBC();
    }
    
    @Path("/jpa")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<Surah> getSurahsJpaSQL() {
        return surahRepository.getSurahsJpaSQL();
    }
}