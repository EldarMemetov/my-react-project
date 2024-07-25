import { useState } from 'react';
import styles from './Filter.module.css';

export default function Filter({ onFilter }) {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className={styles.filterContainer}>
      <input 
        type="text" 
        value={filter} 
        onChange={handleChange} 
        placeholder="Filter by name or city..." 
        className={styles.filterInput}
      />
    </div>
  );
}
