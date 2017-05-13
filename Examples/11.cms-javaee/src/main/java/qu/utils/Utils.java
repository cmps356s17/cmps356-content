package qu.utils;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Utils {

	public static final String contactsUrl = "https://cmps356s17.github.io/data/contacts.json";

	@SuppressWarnings("resource")
	public static String readUrl(String urlString) {
		String content = "";
		try {
			// What is "\\A"? => read
			// https://weblogs.java.net/blog/pat/archive/2004/10/stupid_scanner.html
			content = new Scanner(new URL(urlString).openStream(), "UTF-8").useDelimiter("\\A").next();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return content;
	}

	public static List<String> getCountries() {
		List<String> countries = new ArrayList();
		countries.add("Qatar");
		countries.add("Palestine");
		countries.add("Algeria");
		countries.add("Egypt");
		countries.add("Sudan");
		countries.add("Iraq");
		countries.add("Morocco");
		countries.add("Saudi Arabia");
		countries.add("Yemen");
		countries.add("Syria");
		countries.add("Tunisia");
		countries.add("Somalia");
		countries.add("United Arab Emirates");
		countries.add("Libya");
		countries.add("Jordan");
		countries.add("Mauritania");
		countries.add("Oman");
		countries.add("Kuwait");
		countries.add("Bahrain");

		return countries;
	}

	public static List<String> getCities(String country) {
		/*
		 * try { Thread.sleep( 2000 );//simulate a long running action } catch
		 * (InterruptedException ex) {
		 * Logger.getLogger(ContactRepository.class.getName()).log(Level.SEVERE,
		 * "Thread sleep failed", ex); }
		 */
		List<String> cities = new ArrayList<String>();
		switch (country.toLowerCase()) {
		case "qatar":
			cities = Arrays.asList("Doha", "Al Khor", "Al Wakrah");
			break;
		case "palestine":
			cities = Arrays.asList("Quds", "Gaza", "Khan Yunis");
			break;
		case "algeria":
			cities = Arrays.asList("Algiers", "Oran", "Constantine");
			break;
		case "egypt":
			cities = Arrays.asList("Cairo", "Alexandria", "Damanhur");
			break;
		case "sudan":
			cities = Arrays.asList("Khartoum", "Wadi Halfa", "Taiyara");
			break;
		case "iraq":
			cities = Arrays.asList("Baghdad", "Basra", "Faluja");
			break;
		case "morocco":
			cities = Arrays.asList("Fes", "Casabalanca", "Rabat");
			break;
		case "saudi":
			cities = Arrays.asList("Mecca", "Madina", "Jeddah");
			break;
		case "yeman":
			cities = Arrays.asList("Sana'a", "Aden", "Taizz");
			break;
		case "syria":
			cities = Arrays.asList("Damascus", "Aleppo", "Daraa");
			break;
		case "tunisia":
			cities = Arrays.asList("Tunis", "Sfax", "Soussa");
			break;
		case "somalia":
			cities = Arrays.asList("Mogadishu", "Merca", "Qandala");
			break;
		case "uae":
			cities = Arrays.asList("Dubai", "Abu Dhabi", "Sharjha");
			break;
		case "lybia":
			cities = Arrays.asList("Tripoli", "Benghazi", "Misrata");
			break;
		case "jordan":
			cities = Arrays.asList("Amman", "Irbid", "Al-Aqaba");
			break;
		case "mauritania":
			cities = Arrays.asList("Nouakchott", "Nouadhibou", "Rosso");
			break;
		case "oman":
			cities = Arrays.asList("Muscat", "Nizwa", "Sohar");
			break;
		case "kuwait":
			cities = Arrays.asList("Kuwait city", "Ahmed Al Jaber", "Al Abdaliyah");
			break;
		case "bahrain":
			cities = Arrays.asList("Manama", "Riffa", "Muharraq");
			break;
		}

		return cities;
	}
}
