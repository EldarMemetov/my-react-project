import { useState } from 'react';

export default function useToggleForm(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);

  const showForm = () => setIsVisible(true);
  const hideForm = () => setIsVisible(false);

  return { isVisible, showForm, hideForm };
}
