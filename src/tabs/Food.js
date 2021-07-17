import React, { useState, useEffect } from 'react';
import { callApi } from '../Api';

import BlobImage from '../BlobImage';
import CardSwiperTop from '../CardSwiperTop';
import StackedHearts from '../components/StackedHearts';
import GearIcon from '../../assets/gear_icon.svg';

import styles from './styles.css';
import mainStyles from '../styles.css';

import { cards as publicCards } from '../config/cards';

export default function Food({ user, setTab }) {
    const [cards, setCards] = useState([]);

    useEffect(async () => {
        const result = await callApi("GET", "user/cards", {
            user_id: user.id,
        });
        setCards(result.cards);
    }, []);

    const allCards = [
        ...publicCards,
        ...cards.map((card) => {
            return card.card_text;
        }),
    ];

    return (
        <div className={styles.foodOuter}>
            <div className={styles.foodHeartsContainer}>
                <StackedHearts user={user} />
            </div>
            <div style={{ marginTop: '35px' }}>
                <BlobImage />
            </div>
            <div
                className={styles.foodSettingsContainer}
                onClick={() => {
                    setTab('food_settings');
                }}
            >
                <img src={GearIcon} />
            </div>
            <div className={mainStyles.normalText} style={{ marginTop: '19px' }}>
                Swipe up if you've done it today!
            </div>
            <div style={{ marginTop: '19px', width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <CardSwiperTop
                    cards={allCards}
                    swipeCard={(index) => {
                        const card = cards[index];
                        callApi("PATCH", "card", {
                            id: card.id,
                            changes: {
                                swipes: card.swipes + 1,
                            },
                        });
                    }}
                    onOutOfCards={() => {

                    }}
                />
            </div>
            <button onClick={() => { setTab('home'); }}>
                Back
            </button>
        </div>
    )
}