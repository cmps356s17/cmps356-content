package qu.cms.repository;

import java.util.List;
import javax.annotation.PostConstruct;
import qu.cms.entity.Contact;

public interface IContactRepository {

    Contact addContact(Contact contact);

    void deleteContact(int contactId);

    List<String> getCities(String countryCode);

    Contact getContact(int id);

    List<Contact> getContacts();

    int getContactsCount();

    @PostConstruct
    void insertTestData();

    void updateContact(Contact contact);
 
}
