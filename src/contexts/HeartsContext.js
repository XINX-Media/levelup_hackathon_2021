import React, { useState, useEffect, useContext } from 'react';
import { callApi } from '../Api';
import { useSearch } from '../utils';

import UserContext from './UserContext';

const HeartsContext = React.createContext({});

export default HeartsContext;

export function HeartsProvider({ children }) {
    const [hearts, setHearts] = useState(null);
    const { user } = useContext(UserContext);
    const search = useSearch();

    const refreshHearts = async () => {
		if (user) {
            const result = await callApi("GET", "user/hearts", {
                id: user.id,
            });
    
            setHearts(result.hearts);
        }
    }

	useEffect(async () => {
		refreshHearts();
	}, [user]);

    const value = {
        hearts,
        refreshHearts,
    };

    return (
        <HeartsContext.Provider value={value}>
            {children}
        </HeartsContext.Provider>
    );
};