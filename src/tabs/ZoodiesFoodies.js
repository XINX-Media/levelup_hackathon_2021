import React, { useContext, useEffect, useState } from 'react';
import { callApi } from '../Api';

import styles from './styles.css';
import mainStyles from '../styles.css';

import TabWrapper from '../components/TabWrapper';
import BlobImage from '../BlobImage';
import UserContext from '../contexts/UserContext';
import StackedHearts from '../components/StackedHearts';
import CardSwiperTop from '../CardSwiperTop';
import HeartsContext from '../contexts/HeartsContext';
import StarImage from '../../assets/star_image.svg';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import ZoodNeutralSmile from '../../assets/zoods/zood_neutral_smile.png';
import CardContext from '../contexts/CardContext';

const starList = [
    { x: 11, y: 116 },
    { x: 58, y: 130 },
    { x: 8, y: 160 },
    { x: 48, y: 180 },
    { x: 97, y: 190 },
    { x: 258, y: 184 },
    { x: 318, y: 175 },
    { x: 280, y: 145 },
    { x: 310, y: 115 },
    { x: 283, y: 85 },
    { x: 310, y: 55 },
    { x: 265, y: 42 },
    { x: 303, y: 9 },
    { x: 243, y: 6 },
    { x: 202, y: 16 },
].sort((a, b) => {
    return a.y - b.y;
});

export default function ZoodiesFoodies({ setTab }) {
    const { user } = useContext(UserContext);
    const [pairedUser, setPairedUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [swipedCardIndex, setSwipedCardIndex] = useState(null);
    const [swipedCardProgress, setSwipedCardProgress] = useState(0);
    const [swipedCardAfter, setSwipedCardAfter] = useState(false);
    const { refreshHearts } = useContext(HeartsContext);
    const [stars, setStars] = useState(0);
    const { cards: publicCards } = useContext(CardContext);

    useEffect(async () => {
        const result = await callApi("GET", "user/cards", {
            user_id: user.id,
        });
        setCards(result.cards);
    }, []);

    const allCards = [
        ...publicCards,
        ...cards,
    ];

    const allCardsText = allCards.map(({ card_text }) => {
        return card_text;
    });

    useEffect(async () => {
        if (user && user.paired_user_id) {
            const result = await callApi('GET', 'user/connect', {
                id: user.id,
            });

            setPairedUser(result.user);
        }
    }, [user]);

    useEffect(() => {
        if (swipedCardIndex !== null) {
            let interval = setInterval(() => {
                setSwipedCardProgress((progress) => {
                    if (progress > 14) {
                        clearInterval(interval);
                        setSwipedCardIndex(null);
                        setSwipedCardAfter(true);                        
                        setStars((stars) => {
                            return stars + 1;
                        });
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
                setTab('home');
            }}
            onLeftClicked={() => {
                setTab('map');
            }}
            onRightClicked={() => {
                setTab('food');
            }}
            leftIcon={WooButtonIcon}
            middleIcon={ZoodNeutralSmile}
            rightIcon={FoodButtonIcon}
        >
            {pairedUser && (
                <div
                    className={styles.zoodiesContent}
                    style={{
                        paddingTop: '38px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '46px',
                        }}
                    >
                        <BlobImage
                            blobId={pairedUser.blobColor}
                            name={pairedUser.blobName}
                            beginEat={isDragging && swipedCardIndex === null}
                            eating={swipedCardIndex !== null}
                            afterEating={swipedCardAfter}
                            small
                        /> 
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '61px',
                            right: '36px',
                        }}
                    >
                        <BlobImage
                            name={user.blobName}
                            beginEat={isDragging && swipedCardIndex === null}
                            eating={swipedCardIndex !== null}
                            afterEating={swipedCardAfter}
                        />
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '161px',
                        left: '75px',
                    }}>
                        <StackedHearts />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '18px',
                            right: '45px',
                        }}
                    >
                        <img src={StarImage} style={{ width: '48px', height: '48px' }} />
                        <div
                            className={mainStyles.constraints}
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: '5px',
                            }}
                        >
                            {stars}
                        </div>
                    </div>
                    <div style={{ marginTop: '30px', marginBottom: '40px', position: 'relative', marginTop: '220px' }}>
                        {swipedCardIndex !== null && (
                            <div
                                className={styles.foodFloatingCardHolder}
                                style={{
                                    transform: `scale(${1 - swipedCardProgress / 15}, ${1 - swipedCardProgress / 15})`,
                                    top: -100 - (swipedCardProgress*6),
                                    left: 50 + (swipedCardProgress*6),
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
                            cards={allCardsText}
                            swipeCard={async (index) => {
                                const card = allCards[index];
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
                                await callApi("PUT", "user/connect/give_heart", {
                                    id: user.id,
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
            )}
        </TabWrapper>
    )
}