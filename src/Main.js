import React, { useState } from 'react';

import Home from './tabs/Home';
import Food from './tabs/Food';
import Wood from './tabs/Wood';
import Mood from './tabs/Mood';
import Profile from './tabs/Profile';
import FoodSettings from './tabs/FoodSettings';

export default function Main({ user }) {
	const [tab, setTab] = useState('food');

    if (tab === "home") {
        return <Home
            user={user}
            setTab={setTab}
        />;
    } else if (tab === "food") {
        return <Food
            user={user}
            setTab={setTab}
        />;
    } else if (tab === "wood") {
        return <Wood
            setTab={setTab}
        />;
    } else if (tab === "mood") {
        return <Mood
            setTab={setTab}
        />;
    } else if (tab === "profile") {
        return <Profile
            user={user}
            setTab={setTab}
        />
    } else if (tab === "food_settings") {
        return <FoodSettings
            setTab={setTab}
        />
    }

    return null;
}