import React, { useEffect, useState } from 'react';

import Home from './tabs/Home';
import Food from './tabs/Food';
import Wood from './tabs/Wood';
import Mood from './tabs/Mood';
import Profile from './tabs/Profile';
import FoodSettings from './tabs/FoodSettings';
import Zoodies from './tabs/Zoodies';
import ZoodiesFoodies from './tabs/ZoodiesFoodies';
import { useSearch } from './utils';

export default function Main({ user }) {
	const [tab, setTab] = useState('profile');
    const { search, updateSearch } = useSearch();

    const doSetTab = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab);
            updateSearch({
                tab: newTab
            });
        }
    }

    useEffect(() => {
        if (!search.tab || search.tab === '') {
            setTab('home');
        } else {
            if (search.tab !== tab) {
                setTab(search.tab);
            }
        }
    }, [search.tab]);

    if (tab === "home") {
        return <Home
            user={user}
            setTab={doSetTab}
        />;
    } else if (tab === "food") {
        return <Food
            user={user}
            setTab={doSetTab}
        />;
    } else if (tab === "wood") {
        return <Wood
            setTab={doSetTab}
        />;
    } else if (tab === "mood") {
        return <Mood
            setTab={doSetTab}
        />;
    } else if (tab === "profile") {
        return <Profile
            user={user}
            setTab={doSetTab}
        />
    } else if (tab === "food_settings") {
        return <FoodSettings
            setTab={doSetTab}
        />
    } else if (tab === "zoodies") {
        return <Zoodies
            setTab={doSetTab}
        />
    }

    return null;
}