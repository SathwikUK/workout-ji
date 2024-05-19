import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading to false
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true); // Set isLoading to true when signup process starts
    setError(null);

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const json = await response.json(); // Parse error response
        throw new Error(json.error); // Throw error if response is not ok
      }

      const json = await response.json(); // Parse successful response
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    } catch (error) {
      setError(error.message); // Set error state with error message
    } finally {
      setIsLoading(false); // Set isLoading to false regardless of success or failure
    }
  };

  return { signup, isLoading, error };
};
