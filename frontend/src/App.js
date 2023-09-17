import React from 'react';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

const ENDPOINT = 'http://springfinancial.local/api/user';

export function App() {
  // status: idle | loading | success | error
  const [status, setStatus] = React.useState('idle');
	const { data, isLoading, error } = useSWR(ENDPOINT, fetcher);
  

	// user form
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState();
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

		// clear form
		setName('');
		setAge('');
		setAddress('');

		mutate(ENDPOINT);
		// toggleProductForm();
  }

  return (
    <>
	    {isLoading && (
		    <p>Loading users…</p>
		  )}

	    {error && (
		    <p>Sorry, the users could not be retrieved.</p>
		  )}

			{data && (
	      <>
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th></th>
								<th></th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{data.map(user =>
								<tr key={user.id}>
									<td>
										<a href="">Delete</a>
									</td>
									<td>{user.name}</td>
									<td>
										<a href="">Add Point</a>
									</td>
									<td>
										<a href="">Subtract Point</a>
									</td>
									<td>{user.points}</td>
								</tr>
							)}
						</tbody>
					</table>
	      </>
      )}

		<h2>Add User</h2>
	  <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <p>
          <input type="submit" value="Add User" />
        </p>
      </form>
    </>
  );
}
