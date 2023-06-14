import { useSelector } from 'react-redux';

import ContactsItem from '../contactsItem';

const ContactList = () => {

  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.contacts);

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <ul>
        {filterContacts.map(({ id, name, number }) => {
          return (
            <ContactsItem
              key={id}
              id={id}
              name={name}
              number={number}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
