import React, { useState, useEffect, useContext } from 'react';
import { callApi } from '../Api';

import UserContext from '../contexts/UserContext';
import BlobImage from '../BlobImage';
import TrashIcon from '../../assets/trash_icon.svg';
import BlackHeartRob from '../../assets/black_heart_rob.png';
import TabWrapper from '../components/TabWrapper';

import styles from './styles.css';
import mainStyles from '../styles.css';

export default function FoodSettings({ setTab }) {
    const [cards, setCards] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(async () => {
        const result = await callApi("GET", "user/cards", {
            user_id: user.id,
        });
        setCards(result.cards);
    }, []);

    return (
        <TabWrapper
            onLeftClicked={() => {
                setTab('food');
            }}
        >
            <div>
                <div className={styles.foodSettingsTopContainer}>
                    <BlobImage gear small />
                    <div className={mainStyles.normalText} style={{ marginLeft: '20px' }}>
                        You can view and edit your cards here.
                    </div>
                </div>
                <div className={styles.foodSettingsCardHolder}>
                    {cards.map((card) => {
                        return (
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
                                        <img src={BlackHeartRob} />
                                        <div
                                            className={mainStyles.constraints}
                                            style={{
                                                position: 'absolute',
                                                right: '-2px',
                                                top: '17px',
                                            }}
                                        >
                                            {card.swipes}
                                        </div>
                                    </div>
                                    <div
                                        className={styles.foodSettingsCardTrash}
                                        onClick={async () => {
                                            await callApi("DELETE", "user/cards", {
                                                user_id: user.id,
                                                card_id: card.id,
                                            });
                                            const result = await callApi("GET", "user/cards", {
                                                user_id: user.id,
                                            });
                                            setCards(result.cards);
                                        }}
                                    >
                                        <img src={TrashIcon} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </TabWrapper>
    )
}