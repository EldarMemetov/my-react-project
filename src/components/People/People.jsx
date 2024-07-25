import { useState } from 'react';
import DeleteContact from '../DeleteContact/DeleteContact';
import people from './People.module.css';

function People({ id, name, age, city, status, photo, info, onDelete }) {
  const [like, setLike] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const updateLike = () => {
    setLike(like + 1);
  };

  const infoOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = () => {
    try {
      setShowDelete(!showDelete);
    } catch (error) {
      console.error('Error toggling delete contact:', error);
    }
  };

  const statusLike = like >= 10 ? 'green' : 'black';
  const statusColor = status === 'online' ? 'green' : 'red';

  return (
    <li className={people.peopleList}>
      <img src={photo} alt="Profile" width={120} height={120} />
      <p className={people.status} style={{ color: statusColor }}>{status}</p>
      <h2> {name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      {isOpen && <p className={people.infoText}>Info: {info}</p>}
      <div className={people.buttons}>
        <button onClick={infoOpen}>{isOpen ? 'Close Info' : 'Open Info'}</button>
        <button onClick={updateLike}>Like</button>
        <p className={people.likes} style={{ color: statusLike }}>Likes: {like}</p>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      
      
      {showDelete && <DeleteContact onDelete={() => onDelete(id)} />}
    </li>
  );
}

export default People;
