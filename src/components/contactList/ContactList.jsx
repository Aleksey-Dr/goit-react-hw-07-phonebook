import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ContactsItem from '../contactsItem';
import Loader from '../loader';

import { fetchContacts } from '../../redux/operations';
import { getContacts } from '../../redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(getContacts);
  const { isLoading, error } = useSelector(state => state.contacts);

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p><b>Error: </b>{error}</p>}
      <ul>
        {filterContacts.map(({ id, name, phone }) => {
          return <ContactsItem key={id} id={id} name={name} number={phone} />;
        })}
      </ul>
    </div>
  );
};

export default ContactList;
