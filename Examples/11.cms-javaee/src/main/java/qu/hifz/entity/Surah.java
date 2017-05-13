package qu.hifz.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Surah implements Serializable {
    @Id private int id;
    private String name;
    private String englishName;
    private int ayaCount;
    private String type;

    public Surah() {}
    
    public Surah(String name, String englishName, int ayaCount, String type) {
        this.name = name;
        this.englishName = englishName;
        this.ayaCount = ayaCount;
        this.type = type;
    }
    
    public Surah(int id, String name, String englishName, int ayaCount, String type) {
        this.id = id;
        this.name = name;
        this.englishName = englishName;
        this.ayaCount = ayaCount;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public int getAyaCount() {
        return ayaCount;
    }

    public void setAyaCount(int ayaCount) {
        this.ayaCount = ayaCount;
    }
    
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
}