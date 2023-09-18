import React from 'react';

import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';


export function App() {
  return (
    <>
			<UserList />
	    <AddUserForm />
    </>
  );
}
