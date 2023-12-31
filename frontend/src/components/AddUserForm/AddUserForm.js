import React from 'react';
import * as styles from './AddUserForm.module.css';

import { Dialog } from '@headlessui/react';
import { useSWRConfig } from 'swr';
import { USER_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

function AddUserForm() {
	let [isOpen, setIsOpen] = React.useState(false);

  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [address, setAddress] = React.useState('');

  const { mutate } = useSWRConfig()

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			name: name,
			age: age,
			address: address,
		};

		const response = await fetch(USER_ENDPOINT, {
		    method: 'POST',
		    body: JSON.stringify(data),
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
		setIsOpen(false);

		// clear form
		setName('');
		setAge('');
		setAddress('');

	}

  return (
  	<>
			<Dialog className="popup_wrapper" open={isOpen} onClose={() => setIsOpen(false)}>
				<div className="popup_background" aria-hidden="true" />
				<Dialog.Panel className="popup">
					<Dialog.Title>Add User</Dialog.Title>
					  <form onSubmit={handleSubmit}>
			        <label htmlFor="name">Name</label>
			        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

			        <label htmlFor="age">Age</label>
			        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

			        <label htmlFor="address">Address</label>
			        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

			        <p class="buttons">
			          <button className="secondary" onClick={() => setIsOpen(false)}>Cancel</button>
			          <input className="primary" type="submit" value="Add User" />
			        </p>
				     </form>
				</Dialog.Panel>
			</Dialog>

			<button className="add_user" onClick={() => setIsOpen(true)}>Add User</button>
  	</>
  );
}

export default AddUserForm;
