import React, { useContext } from 'react';
import { useSearch } from './utils';

import UserContext from './contexts/UserContext';

import Main from './Main';
import Onboarding from './Onboarding';

export default function MainApp() {
    const { user, setUser } = useContext(UserContext);
    const { search } = useSearch();
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