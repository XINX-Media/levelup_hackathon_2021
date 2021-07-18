import React, { useState, useEffect, useContext } from 'react';
import { callApi } from '../Api';


import { cards as standardCards } from '../config/cards';
import UserContext from './UserContext';

const CardContext = React.createContext({});

export default CardContext;

export function CardProvider({ children }) {
    const { user } = useContext(UserContext);
    const [filteredPublicCards, setFilteredPublicCards] = useState([]);

    const refreshCards = async () => {
        if (user && user.id) {
            let result = await callApi("GET", "user/standard_card", { id: user.id });
            const cardData = result.cards;

            const dataByIndex = cardData.reduce((obj, data) => {
                return {
                    ...obj,
                    [data.card_index]: data,
                };
            }, {});

            setFilteredPublicCards(standardCards.map((card, index) => {
                const data = dataByIndex[index];
                return {
                    card_text: card,
                    ...data,
                }
            }).filter((card) => {
                if (card.deleted) {
                    return false;
                }

                return true;
            }));
        }
    }

	useEffect(async () => {
		refreshCards();
	}, [user]);

    const value = {
        cards: filteredPublicCards,
        refreshCards
    };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
};