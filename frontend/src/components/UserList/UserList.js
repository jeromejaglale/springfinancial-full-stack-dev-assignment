import React from 'react';
import * as styles from './UserList.module.css';

import useSWR from 'swr';
import { useSWRConfig } from 'swr';

import { USER_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

import UserDetails from '../UserDetails';

import {
  X,
  Plus,
  Minus,
} from 'react-feather';

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
				const value1 = u1.name.toUpperCase();
				const value2 = u2.name.toUpperCase();

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
		    <p className="message">Loading users…</p>
		  )}

	    {error && (
		    <p className="message">Sorry, the users could not be retrieved.</p>
		  )}

		  {/* user list */}
			{userList && false && (userList.length > 0 || nameFilter) && (
	      <>
					<form>
					  <input type="text" id="nameFilter" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} placeholder="Filter by name" />
					</form>

					<table>
						<thead>
							<tr>
								<th></th>
								<th className="name">
									<button className={sortField === 'name' ? 'selected' : ''} onClick={(e) => setSortField('name')}>Name</button>
								</th>
								<th className="points">
									<button className={sortField === 'points' ? 'selected' : ''} onClick={(e) => setSortField('points')}>Points</button>
								</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{userList.map(user =>
								<tr key={user.id}>
									<td>
										<button title="Remove User" class="icon" onClick={() => deleteUser(user.id)}>
											<X size={40} />
										</button>

									</td>
									<td className="name">
										<a href="" onClick={(e) => showUser(user.id, e)}>{user.name}</a>
									</td>
									<td className="points">{user.points} points</td>
									<td>
										<button title="Remove Point" class="icon" onClick={() => removePoint(user.id)}>
											<Minus size={40} />
										</button>
									</td>
									<td>
										<button title="Add Point" class="icon" onClick={() => addPoint(user.id)}>
											<Plus size={40} />
										</button>
									</td>
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
