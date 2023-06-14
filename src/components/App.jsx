import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';

export const App = () => {

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '420px',
        margin: '20px',
      }}
    >
      <h2>Phonebook</h2>
      <ContactForm />

      <h3>Contacts</h3>
      <Filter />

      <ContactList />
    </div>
  );
};
