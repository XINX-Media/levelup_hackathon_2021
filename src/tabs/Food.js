import React, { useState, useEffect, useContext } from 'react';
import { callApi } from '../Api';

import BlobImage from '../BlobImage';
import CardSwiperTop from '../CardSwiperTop';
import StackedHearts from '../components/StackedHearts';
import GearIcon from '../../assets/gear_icon.svg';
import TabWrapper from '../components/TabWrapper'
import Modal from '../Modal';
import AddCardModal from '../modals/AddCardModal';

import styles from './styles.css';
import mainStyles from '../styles.css';

import { cards as standardCards } from '../config/cards';
import HeartsContext from '../contexts/HeartsContext';

export default function Food({ user, setTab }) {
    const [cards, setCards] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [swipedCardIndex, setSwipedCardIndex] = useState(null);
    const [swipedCardProgress, setSwipedCardProgress] = useState(0);
    const [swipedCardAfter, setSwipedCardAfter] = useState(false);
    const { refreshHearts } = useContext(HeartsContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredPublicCards, setFilteredPublicCards] = useState([]);

    useEffect(async () => {
        const result = await callApi("GET", "user/cards", {
            user_id: user.id,
        });
        setCards(result.cards);
    }, [modalOpen]);

    useEffect(async () => {
        if (user && user.id) {
            const result = await callApi("GET", "user/standard_card", { id: user.id });
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
    }, [user]);

    const allCards = [
        ...filteredPublicCards,
        ...cards,
    ];

    const allText = allCards.map(({ card_text }) => {
        return card_text;
    });

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
            onMiddleClicked={() => {
                setModalOpen(true);
            }}
            modal={modalOpen && (
                <Modal>
                    <AddCardModal
                        close={() => {
                            setModalOpen(false);
                        }}
                    />
                </Modal>
            )}
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
                                    {allCards[swipedCardIndex].card_text}
                                </div>
                            </div>
                        </div>
                    )}
                    <CardSwiperTop
                        cards={allText}
                        swipeCard={async (index) => {
                            const card = allCards[index];
                            console.log(card);
                            if (card.card_index === undefined) {
                                await callApi("PATCH", "card", {
                                    id: card.id,
                                    changes: {
                                        swipes: card.swipes + 1,
                                    },
                                });
                            } else {
                                await callApi("PATCH", "user/standard_card", {
                                    user_id: user.id,
                                    card_index: card.card_index, 
                                    changes: {
                                        swipes: card.swipes + 1,
                                    },
                                });
                            }
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