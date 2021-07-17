import React, { useState, useEffect, useContext } from 'react';
import { callApi } from '../Api';

import BlobImage from '../BlobImage';
import CardSwiperTop from '../CardSwiperTop';
import StackedHearts from '../components/StackedHearts';
import GearIcon from '../../assets/gear_icon.svg';
import TabWrapper from '../components/TabWrapper'

import styles from './styles.css';
import mainStyles from '../styles.css';

import { cards as publicCards } from '../config/cards';
import HeartsContext from '../contexts/HeartsContext';

export default function Food({ user, setTab }) {
    const [cards, setCards] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [swipedCardIndex, setSwipedCardIndex] = useState(null);
    const [swipedCardProgress, setSwipedCardProgress] = useState(0);
    const [swipedCardAfter, setSwipedCardAfter] = useState(false);
    const { refreshHearts } = useContext(HeartsContext);

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

    useEffect(() => {
        if (swipedCardIndex !== null) {
            let interval = setInterval(() => {
                setSwipedCardProgress((progress) => {
                    if (progress > 14) {
                        clearInterval(interval);
                        setSwipedCardIndex(null);
                        setSwipedCardAfter(true);
                    }
                    return progress + 1;
                });
            }, 25);

            return () => {
                clearInterval(interval);
            }
        }
    }, [swipedCardIndex]);

    useEffect(() => {
        if (swipedCardAfter) {
            const timeout = setTimeout(() => {
                setSwipedCardAfter(false);
                refreshHearts();
            }, 500);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [swipedCardAfter]);

    return (
        <TabWrapper
            onLeftClicked={() => {
                setTab('home');
            }}
        >
            <div className={styles.foodOuter}>
                <div className={styles.foodHeartsContainer}>
                    <StackedHearts user={user} />
                </div>
                <div style={{ marginTop: '35px' }}>
                    <BlobImage
                        beginEat={isDragging && swipedCardIndex === null}
                        eating={swipedCardIndex !== null}
                        afterEating={swipedCardAfter}
                    />
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
                    {swipedCardIndex !== null && (
                        <div
                            className={styles.foodFloatingCardHolder}
                            style={{
                                transform: `scale(${1 - swipedCardProgress / 15}, ${1 - swipedCardProgress / 15})`,
                                top: 140 - (swipedCardProgress*6),
                            }}
                        >
                            <div
                                className={mainStyles.cardSwiperCard}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div className={mainStyles.subheading}>
                                    {allCards[swipedCardIndex]}
                                </div>
                            </div>
                        </div>
                    )}
                    <CardSwiperTop
                        cards={allCards}
                        swipeCard={async (index) => {
                            const card = cards[index];
                            await callApi("PATCH", "card", {
                                id: card.id,
                                changes: {
                                    swipes: card.swipes + 1,
                                },
                            });
                            setSwipedCardIndex(index);
                            setSwipedCardProgress(0);
                        }}
                        onCardDragBegin={() => {
                            setIsDragging(true);
                        }}
                        onCardDragEnd={() => {
                            setIsDragging(false);
                        }}
                    />
                </div>
            </div>
        </TabWrapper>
    )
}