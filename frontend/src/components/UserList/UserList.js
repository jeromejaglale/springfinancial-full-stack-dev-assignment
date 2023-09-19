import React from 'react';
import * as styles from './UserList.module.css';

import useSWR from 'swr';
import { useSWRConfig } from 'swr';

import { USER_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

import UserDetails from '../UserDetails';

function filterAndSortUserList(userList, nameFilter, sortField) {
	if(userList) {
		// filter user list by name
		if(nameFilter) {
			userList = userList.filter(user => user.name.search(new RegExp(nameFilter, 'i')) !== -1);
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

	return userList;
}

function UserList() {
	const [nameFilter, setNameFilter] = React.useState('');
	const [sortField, setSortField] = React.useState('points');

	// user for user popup
	const [user, setUser] = React.useState(null);

	// fetch users
	const { data, isLoading, error } = useSWR(USER_ENDPOINT, fetcher);
	const userList = filterAndSortUserList(data, nameFilter, sortField);

  const { mutate } = useSWRConfig()

	async function addPoint(userId) {
		const url = `${USER_ENDPOINT}/${userId}/add-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
  }

  async function removePoint(userId) {
		const url = `${USER_ENDPOINT}/${userId}/remove-point`;
		const response = await fetch(url, {
		    method: 'PUT'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
  }

  async function deleteUser(userId) {
		const url = `${USER_ENDPOINT}/${userId}`;
		const response = await fetch(url, {
		    method: 'DELETE'
		  });

		const json = await response.json();

		// TODO error handling

		mutate(USER_ENDPOINT);
  }

  async function showUser(userId, event) {
		event.preventDefault();

		const url = `${USER_ENDPOINT}/${userId}`;
		const response = await fetch(url);
		const json = await response.json();

		// TODO error handling

		setUser(json);
  }

  return (
    <>
		  {/* user details popup */}
	    {user && (
		    <UserDetails user={user} setUser={setUser} />
		  )}

	    {isLoading && (
		    <p>Loading users…</p>
		  )}

	    {error && (
		    <p>Sorry, the users could not be retrieved.</p>
		  )}

		  {/* user list */}
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
										<button onClick={() => deleteUser(user.id)}>Delete</button>
									</td>
									<td>
										<a href="" onClick={(e) => showUser(user.id, e)}>{user.name}</a>
									</td>
									<td>
										<button onClick={() => addPoint(user.id)}>Add Point</button>
									</td>
									<td>
										<button onClick={() => removePoint(user.id)}>Remove Point</button>
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
