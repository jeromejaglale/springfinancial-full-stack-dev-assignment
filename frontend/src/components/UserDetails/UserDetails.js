import React from 'react';
import * as styles from './UserDetails.module.css';

import { USER_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

import { Dialog } from '@headlessui/react';

function UserDetails({user, setUser}) {
  return (
  	<>
			<Dialog className="popup_wrapper" open={user != null} onClose={() => setUser(null)}>
				<Dialog.Panel className="popup">
					<Dialog.Title>{user.name}</Dialog.Title>
					<p className="points">{user.points} points</p>
					<p>Age: {user.age} years</p>
					<p>Address: {user.address}</p>

					<p class="buttons">
			      <button className="primary" onClick={() => setUser(null)}>Close</button>
			    </p>
				</Dialog.Panel>
			</Dialog>
  	</>
  );
}

export default UserDetails;
