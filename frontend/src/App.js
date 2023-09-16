import React from 'react';
import useSWR from 'swr';

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

    </>
  );
}
