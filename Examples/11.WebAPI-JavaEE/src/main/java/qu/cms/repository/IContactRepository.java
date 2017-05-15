package qu.cms.repository;

import java.util.List;

import qu.cms.entity.Contact;

public interface IContactRepository {
    Contact addContact(Contact contact);

    void deleteContact(int contactId);

    Contact getContact(int id);

    List<Contact> getContacts();

    int getContactsCount();

    //@PostLoad
    void insertTestData();

    void updateContact(Contact contact);
    
    List<String> getCountries();
    List<String> getCities(String country);
}
