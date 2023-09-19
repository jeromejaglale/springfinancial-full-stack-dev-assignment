import React from 'react';
import * as styles from './UserDetails.module.css';

import { USER_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

import { Dialog } from '@headlessui/react';

function UserDetails({user, setUser}) {
  return (
  	<>
			<Dialog open={user != null} onClose={() => setUser(null)}>
				<Dialog.Panel>
					<Dialog.Title>{user.name}</Dialog.Title>
					<p>Points: {user.points} points</p>
					<p>Age: {user.age} years</p>
					<p>Address: {user.address}</p>
					<button onClick={() => setUser(null)}>Close</button>
				</Dialog.Panel>
			</Dialog>
  	</>
  );
}

export default UserDetails;
