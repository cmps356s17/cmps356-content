package qu.cms.repository;

import com.google.gson.Gson;
import java.util.List;

import java.util.ArrayList;
import java.util.Arrays;
import qu.cms.entity.Contact;
import qu.utils.Utils;

public class ContactRepository implements IContactRepository {

    private List<Contact> contacts;
    private int lastContactId = 0;
    
    public List<Contact> getContacts() {
        if (contacts != null) {
            return contacts;
        }
        else {
            insertTestData();
            return contacts;
        }
    }

    public Contact addContact(Contact contact) {
        if (contacts == null) {
            contacts = new ArrayList<Contact>();
        }
        contacts.add(contact);
        contact.setId(++lastContactId);
        return contact;
    }
    
    public void updateContact(Contact contact) {
        for (int i = 0; i < contacts.size(); i++) {
            if (contacts.get(i).getId() == contact.getId()) {
               contacts.set(i, contact);
               break;
            }
        }
    }

    public void deleteContact(int contactId) {
        contacts.removeIf(c -> c.getId() == contactId);
    }

    public Contact getContact(int id) {
        if (contacts == null) {
            insertTestData();
        }
        try  {
        return contacts.stream().filter(c -> c.getId() == id).findFirst().get();
        } catch (Exception ex) {
            return null;
        }
    }

    public int getContactsCount() {
        return contacts == null ? 0 : contacts.size();
    }
    
    public void insertTestData() {
        if (contacts != null && contacts.size() > 0) {
            return;
        }
        
        Gson gson = new Gson();
        String contactsStr = Utils.readUrl(Utils.contactsUrl);
        System.out.println(contactsStr);

        Contact[] contactArray = gson.fromJson(contactsStr, Contact[].class);
        //Convert the array to a editable list 
        contacts = new ArrayList<>(Arrays.asList(contactArray));
        lastContactId = contacts.size();
    }
  
    public List<String> getCountries() {
    	return Utils.getCountries();
    }
    
    public List<String> getCities(String country) {
    	return Utils.getCities(country);
    }  
}
