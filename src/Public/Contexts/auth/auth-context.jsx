import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  name: null,
  email: null,
  phone: null,
  addresses: [],
  isVerified: false,

  role_as:0
});

export default AuthContext;
