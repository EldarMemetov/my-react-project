import { useState } from 'react';
export default function DeleteContact({ onDelete }) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handlePasswordChange = event => {
    const valuePassword = event.target.value;
    setPassword(valuePassword);
    if (valuePassword === '12345') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  return (
    <div>
      <label>To delete a contact, enter the password: 12345</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      {isAuthorized && <button onClick={onDelete}>Delete</button>}
    </div>
  );
}
