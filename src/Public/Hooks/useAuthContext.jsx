import { useContext } from 'react';

import AuthContext from '../Contexts/auth/auth-context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext must be inside AuthProvider');
  }

  return context;
};
