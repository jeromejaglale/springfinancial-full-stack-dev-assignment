import React from 'react';
import { Dialog } from '@headlessui/react';
import { useSWRConfig } from 'swr';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

const ENDPOINT = 'http://springfinancial.local/api/user';

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

		const response = await fetch(ENDPOINT, {
		    method: 'POST',
		    body: JSON.stringify(data),
		  });

		const json = await response.json();

		// TODO error handling

		mutate(ENDPOINT);
		setIsOpen(false);

		// clear form
		setName('');
		setAge('');
		setAddress('');

	}

  return (
  	<>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Panel>
				<Dialog.Title>Add User</Dialog.Title>
					  <form onSubmit={handleSubmit}>
				        <label htmlFor="name">Name:</label>
				        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

				        <label htmlFor="age">Age:</label>
				        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

				        <label htmlFor="address">Address:</label>
				        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

				        <p>
				          <input type="submit" value="Add User" />
				          <button onClick={() => setIsOpen(false)}>Cancel</button>
				        </p>
				      </form>
				</Dialog.Panel>
			</Dialog>

			<button onClick={() => setIsOpen(true)}>Add User</button>
  	</>
  );
}

export default AddUserForm;
