import React from 'react';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { USER_ENDPOINT } from '../../constants';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

function UserList() {
	const [nameFilter, setNameFilter] = React.useState('');
	const [sortField, setSortField] = React.useState('points');

  // status: idle | loading | success | error
  const [status, setStatus] = React.useState('idle');
	const { data, isLoading, error } = useSWR(USER_ENDPOINT, fetcher);

	var userList = data;

	if(userList) {
		// filter user list by name
		if(nameFilter) {
			userList = userList.filter(user => user.name.search(new RegExp(nameFilter, "i")) !== -1);
		}

		// sort user list
		if(sortField === 'points') {
			userList.sort((u1, u2) => u2.points - u1.points);
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

  const { mutate } = useSWRConfig()

async function addPoint(userId, event) {
		event.preventDefault();

		const url = `${USER_ENDPOINT}/${userId}/add-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
  }

  async function removePoint(userId, event) {
		event.preventDefault();

		const url = `${USER_ENDPOINT}/${userId}/remove-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
  }

  async function deleteUser(userId, event) {
		event.preventDefault();

		const url = `${USER_ENDPOINT}/${userId}`;
		console.log(url);
		const response = await fetch(url, {
		    method: 'DELETE'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
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
    </>
  );
}

export default UserList;
