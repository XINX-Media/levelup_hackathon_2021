import React, { useState, useEffect } from 'react';
import { callApi } from '../Api';
import { useSearch } from '../utils';

const UserContext = React.createContext({});

export default UserContext;

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const { search } = useSearch();

	useEffect(async () => {
		if (search.id) {
			let user = await callApi('GET', 'user', {
				identifier: search.id,
			});
			if (!user.user) {
				user = await callApi('POST', 'user', {
					identifier: search.id,
				});
			}

			setUser(user.user);
		}
	}, [search]);

    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};