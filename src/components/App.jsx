import { useState, useEffect } from 'react';
import PeopleList from './PeopleList/PeopleList';
import LoginForm from './Form/Form';
import peopleJson from './peopleData/people.json';
import useToggleForm from './useToggleForm/useToggleForm';
import Filter from './Filter/Filter'; 
import styles from './useToggleForm/useToggleForm.module.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [filter, setFilter] = useState('');
  const { isVisible, showForm, hideForm } = useToggleForm(false);

  useEffect(() => {
    try {
      const storedPeople = JSON.parse(localStorage.getItem('people'));
      if (storedPeople && Array.isArray(storedPeople) && storedPeople.length > 0) {
        setPeople(storedPeople);
      } else {
        setPeople(peopleJson);
        localStorage.setItem('people', JSON.stringify(peopleJson));
      }
    } catch (error) {
      console.error('Error loading or parsing data from localStorage:', error);
      setPeople(peopleJson);
      localStorage.setItem('people', JSON.stringify(peopleJson));
    }
  }, []);

  useEffect(() => {
    setFilteredPeople(
      people.filter(
        person =>
          person.name.toLowerCase().includes(filter.toLowerCase()) ||
          person.city.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [people, filter]);

  const addUser = newUser => {
    const updatedPeople = [newUser, ...people];
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
    hideForm();
  };

  const deleteUser = id => {
    const updatedPeople = people.filter(person => person.id !== id);
    if (updatedPeople.length === 0) {
      setPeople(peopleJson);
      localStorage.setItem('people', JSON.stringify(peopleJson));
    } else {
      setPeople(updatedPeople);
      localStorage.setItem('people', JSON.stringify(updatedPeople));
    }
  };

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
  };

  return (
    <div>
      <Filter onFilter={handleFilterChange} />
      {!isVisible ? (
        <button className={styles.toggleButton} onClick={showForm}>
          Create New User
        </button>
      ) : (
        <>
          <button className={`${styles.toggleButton} ${styles.hiddenButton}`} onClick={hideForm}>
            Hide Form
          </button>
          <LoginForm onAdd={addUser} />
        </>
      )}
      <PeopleList items={filteredPeople} onDelete={deleteUser} />
    </div>
  );
};

export default App;
