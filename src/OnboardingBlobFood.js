import React, { useState } from 'react';
import classnames from 'classnames';
import { callApi } from './Api';

import CardSwiper from './CardSwiper';
import BlobImage from './BlobImage';

import ArrowRight from '../assets/button_arrow_right.svg';
import ArrowLeft from '../assets/button_arrow_left.svg';
import PlusButtonIcon from '../assets/plus_button_icon.svg';
import OnboardingButton from './OnboardingButton';
import SeptagonButtonBackground from '../assets/septagon_button_background.svg';

import { onboardingCards as cards } from './config/cards';

import styles from './styles.css';

export default function OnboardingBlobFood({ user, setUser, goBack }) {
    const [showModal, setShowModal] = useState(false);
    const [popupText, setPopupText] = useState("");

    return (
        <div className={styles.onboardingBlobFoodOuter}>
            <div className={styles.onboardingBlobFoodInner}>
                <div className={styles.onboardingBlobFoodContent}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '-80px',
                        }}
                    >
                        <BlobImage />
                    </div>
                    <div
                        style={{
                            marginTop: '98px',
                        }}
                        className={styles.normalText}
                    >
                        Feeding your zood
                    </div>
                    <div className={styles.onboardingBlobFoodCardOuter}>
                        <div
                            className={styles.normalText}
                            style={{
                                marginLeft: '17px',
                            }}
                        >
                            Skip
                        </div>
                        <CardSwiper
                            height={220}
                            width={220}
                            cards={cards}
                            swipeCard={async (index, left) => {
                                if (index === 0) {
                                    // ignore instructions card
                                    return;
                                }
                                /*const newCards = [
                                    ...cards,
                                ];
                                console.log(newCards);
                                newCards.splice(0, 1);
                                console.log(newCards);
                                setCards(newCards);*/
                            }}
                            onOutOfCards={async () => {
                                const result = await callApi('PATCH', 'user', {
                                    identifier: user.identifier,
                                    changes: {
                                        hasOnboarded: true,
                                    }
                                });
                                setUser(result.user);
                            }}
                        />
                        <div
                            className={styles.normalText}
                            style={{
                                marginRight: '17px',
                            }}
                        >
                            Add
                        </div>
                    </div>
                    <div className={styles.onboardingBlobFoodBottom}>
                        <div className={styles.onboardingBlobFoodBottomInner}>
                            <div
                                className={styles.onboardingBlobFoodButton}
                                onClick={goBack}
                            >
                                <img src={ArrowLeft} />
                            </div>
                            <div
                                className={styles.onboardingBlobFoodButton}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    position: 'relative',
                                    top: '-9px',
                                    background: 'unset',
                                }}
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                <img src={SeptagonButtonBackground} />
                                <img
                                    src={PlusButtonIcon}
                                    style={{
                                        position: 'absolute',
                                    }}
                                />
                            </div>
                            <div className={styles.onboardingBlobFoodButton}>
                                <img src={ArrowRight} />
                            </div>
                        </div>
                        <div
                            className={styles.instructions}
                            style={{
                                color: '#fff',
                                marginTop: '-32px',
                            }}
                        >
                            Add card
                        </div>
                    </div>
                </div>
                {showModal && (
                    <div className={styles.modalOuter}>
                        <div className={styles.onboardingBlobFoodModalOuter}>
                            <div className={styles.normalText} style={{textAlign: 'center'}}>
                                Add a custom card!
                            </div>
                            <div style={{ height: '220px', marginTop: '20px', marginBottom: '20px' }}>
                                <div className={styles.cardSwiperCardFixed}>
                                    <textarea
                                        className={classnames(styles.textarea, styles.normalText)}
                                        onChange={(e) => {
                                            setPopupText(e.target.value);
                                        }}
                                        value={popupText}
                                    ></textarea>
                                </div>
                            </div>
                            <OnboardingButton
                                text="Add card!"
                                onClick={async () => {
                                    if (popupText !== "") {
                                        const card = await callApi("POST", "card", {
                                            user_id: user.id,
                                            card_text: popupText,
                                        });
                                    }
                                    setPopupText("");
                                    setShowModal(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}