import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ContactsItem from '../contactsItem';
import Loader from '../loader';

import { fetchContacts } from '../../redux/operations';

const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.items);
  const loading = useSelector(state => state.contacts.isLoading);

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      {loading && <Loader />}
      <ul>
        {filterContacts.map(({ id, name, phone }) => {
          return <ContactsItem key={id} id={id} name={name} number={phone} />;
        })}
      </ul>
    </div>
  );
};

export default ContactList;
