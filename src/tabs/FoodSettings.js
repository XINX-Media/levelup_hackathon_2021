import React, { useState, useContext, useEffect } from 'react';
import { callApi } from '../Api';

import UserContext from '../contexts/UserContext';
import BlackHeartRob from '../../assets/black_heart_rob.png';
import TabWrapperStandard from '../components/TabWrapperStandard';
import ZoodNeutralGearIcon from '../../assets/zoods/zood_neutral_gear_icon.png';
import StackedHeartsTwo from '../components/StackedHeartsTwo';
import CardPlank from '../components/CardPlank';

import styles from './styles.css';
import mainStyles from '../styles.css';
import BlobImage from '../BlobImage';

export default function FoodSettings({ setTab }) {
    const [cards, setCards] = useState([]);
    const { user } = useContext(UserContext);

    const refreshCards = async () => {
        const result = await callApi("GET", "user/cards", {
            user_id: user.id,
        });
        setCards(result.cards);
    }

    useEffect(() => {
        refreshCards();
    }, []);

    return (
        <TabWrapperStandard
            setTab={setTab}
            showAddCard
            onRefreshCards={refreshCards}
        >
            <div className={mainStyles.centeredContent}>
                <div className={styles.foodSettingsTopContainer} style={{ marginTop: "18px", marginBottom: '10px'}}>
                    <div>
                        <BlobImage gear tiny />
                    </div>
                    <div className={mainStyles.heading} style={{ marginLeft: '20px' }}>
                        Edit Care Cards
                    </div>
                </div>
                <div style={{ marginTop: '10px', marginBottom: '60px' }}>
                    {cards.map((card, index) => {
                        return (
                            <div
                                style={{ marginTop: index === 0 ? 0 : 20, width: '330px' }}
                                key={`card_${index}`}
                            >
                                <CardPlank
                                    swipes={card.swipes}
                                    text={card.card_text}
                                    cardId={card.id}
                                    onDelete={refreshCards}
                                />
                            </div>
                        );
                        /*
                            <div
                                className={styles.foodSettingsCardOuter}
                                key={card.id}
                            >
                                <div
                                    className={mainStyles.subheading}
                                    style={{
                                        display: 'flex',
                                        alignItems: "center",
                                    }}
                                >
                                    {card.card_text}
                                </div>
                                <div className={styles.foodSettingsCardRight}>
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        <StackedHeartsTwo />
                                    </div>
                                </div>
                            </div>
                        */
                    })}
                </div>
            </div>
        </TabWrapperStandard>
    )
}