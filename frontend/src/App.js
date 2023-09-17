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
	const [nameFilter, setNameFilter] = React.useState('');
	const [sortField, setSortField] = React.useState('points');

  // status: idle | loading | success | error
  const [status, setStatus] = React.useState('idle');
	const { data, isLoading, error } = useSWR(ENDPOINT, fetcher);

	var userList = data;

	if(userList) {
		// filter user list by name
		if(nameFilter) {
			userList = userList.filter(user => user.name.search(new RegExp(nameFilter, "i")) !== -1);
		}

		// sort user list
		if(sortField === 'points') {
			userList.sort((u1, u2) => u1.points - u2.points);
		}
		else {
			userList.sort((u1, u2) => {
				value1 = u1.name.toUpperCase();
				value2 = u2.name.toUpperCase();

				if (value1 < value2) {
				  return -1;
				}

				if (value1 > value2) {
				  return 1;
				}

				return 0;
			});
		}
	}


	// user form
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

		// clear form
		setName('');
		setAge('');
		setAddress('');

		mutate(ENDPOINT);
  }

  async function addPoint(userId, event) {
		event.preventDefault();

		const url = `${ENDPOINT}/${userId}/add-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(ENDPOINT);
  }

  async function removePoint(userId, event) {
		event.preventDefault();

		const url = `${ENDPOINT}/${userId}/remove-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(ENDPOINT);
  }

  async function deleteUser(userId, event) {
		event.preventDefault();

		const url = `${ENDPOINT}/${userId}`;
		console.log(url);
		const response = await fetch(url, {
		    method: 'DELETE'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(ENDPOINT);
  }

  return (
    <>
	    {isLoading && (
		    <p>Loading users…</p>
		  )}

	    {error && (
		    <p>Sorry, the users could not be retrieved.</p>
		  )}

			{userList && (
	      <>
					<form>
					  <label htmlFor="nameFilter">Filter by Name:</label>
					  <input type="text" id="nameFilter" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
					</form>

					<table>
						<thead>
							<tr>
								<th></th>
								<th>
									<button onClick={(e) => setSortField('name')}>Name</button>
								</th>
								<th></th>
								<th></th>
								<th>
									<button onClick={(e) => setSortField('points')}>Points</button>
								</th>
							</tr>
						</thead>
						<tbody>
							{userList.map(user =>
								<tr key={user.id}>
									<td>
										<a href="" onClick={(e) => deleteUser(user.id, e)}>Delete</a>
									</td>
									<td>{user.name}</td>
									<td>
										<a href="" onClick={(e) => addPoint(user.id, e)}>Add Point</a>
									</td>
									<td>
										<a href="" onClick={(e) => removePoint(user.id, e)}>Remove Point</a>
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
