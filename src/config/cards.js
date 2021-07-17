import React from 'react';

import styles from '../styles.css';

const introCard = (
    <>
        <div className={styles.instructions} style={{ fontSize: '16px', lineHeight: '19px' }}>
            We’ll show you tasks. Swipe right if they’re easy. Swipe left if they’re hard.
        </div>
        <div className={styles.instructions} style={{ marginTop: '21px', fontSize: '16px', lineHeight: '19px' }}>
            Each day you complete one it turns into food for your zood!
        </div>
    </>
);

export const cards = [];

export const onboardingCards = [introCard, ...cards];
