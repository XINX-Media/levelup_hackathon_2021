import React, { useState } from 'react';
import { callApi } from './Api';

import CardSwiper from './CardSwiper';
import BlobImage from './BlobImage';

import Modal from './Modal';
import AddCardModal from './modals/AddCardModal';
import HeartOne from '../assets/heart_one.png';

import { cards } from './config/cards';

import styles from './styles.css';
import Button from './components/Button';

export default function OnboardingBlobFood({ user, setUser, goBack }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.onboardingBlobFoodOuter}>
            <div className={styles.onboardingBlobFoodInner}>
                <div className={styles.onboardingBlobFoodContent}>
                    <div
                        style={{
                            marginTop: '25px',
                        }}
                        className={styles.normalText}
                    >
                        Care Cards feed your Zood!
                    </div>
                    <div
                        style={{
                            marginTop: '40px'
                        }}
                    >
                        <BlobImage />
                    </div>
                    <div className={styles.onboardingBlobFoodCardOuter}>
                        <div
                            className={styles.normalText}
                            style={{
                                marginLeft: '17px',
                            }}
                        >
                            Hard
                        </div>
                        <CardSwiper
                            height={220}
                            width={220}
                            cards={cards}
                            introCard={ (
                                <>
                                    <div className={styles.instructions} style={{ fontSize: '16px', lineHeight: '19px' }}>
                                        We’ll show you tasks. Swipe right if they’re easy. Swipe left if they’re hard. Delete them if you don’t need the task.
                                    </div>
                                    <div className={styles.instructions} style={{ marginTop: '21px', fontSize: '16px', lineHeight: '19px', position: 'relative' }}>
                                        +1&nbsp;&nbsp;&nbsp;&nbsp; for each task done!
                                        <img src={HeartOne} style={{ position: 'absolute', top: '3px', left: "14px", width: '20px' }} />
                                    </div>
                                </>
                            )}
                            swipeCard={async (index, left) => {
                                const easy = !left;
                                callApi('POST', 'user/standard_card', {
                                    user_id: user.id,
                                    card_index: index,
                                    easy,
                                    deleted: false
                                });
                            }}
                            onDelete={(index) => {
                                callApi('POST', 'user/standard_card', {
                                    user_id: user.id,
                                    card_index: index,
                                    easy: null,
                                    deleted: true,
                                });
                            }}
                        />
                        <div
                            className={styles.normalText}
                            style={{
                                marginRight: '17px',
                            }}
                        >
                            Easy
                        </div>
                    </div>
                    <div style={{ marginTop: '60px', marginBottom: '68px' }}>
                        <Button
                            text="Care Cards selected!"
                            onClick={async () => {
                                const result = await callApi('PATCH', 'user', {
                                    identifier: user.identifier,
                                    changes: {
                                        hasOnboarded: true,
                                        extra_hearts: 1,
                                    }
                                });
                                setUser(result.user);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}