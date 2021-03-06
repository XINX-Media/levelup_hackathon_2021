import React, { useContext, useEffect } from 'react';
import { useSearch, randomString } from './utils';

import UserContext from './contexts/UserContext';

import Main from './Main';
import Onboarding from './Onboarding';

export default function MainApp() {
    const { user, setUser } = useContext(UserContext);
    const { search, searchLoaded, updateSearch } = useSearch();

	useEffect(() => {
		if (searchLoaded && !search.id) {
			const newId = randomString(15);
			updateSearch({
				id: newId,
			});
		}
	}, [search, searchLoaded]);

    return (
        <>
            {!search.id && (
				<div>
					No ID found!
				</div>
			)}
			{search.id && !user && (
				<div>
					Loading...
				</div>
			)}
			{user && !user.hasOnboarded && (
				<Onboarding
					user={user}
					setUser={setUser}
				/>
			)}
			{user && user.hasOnboarded && (
				<Main
					user={user}
				/>
			)}
        </>
    )
}