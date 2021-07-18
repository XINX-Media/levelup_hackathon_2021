import React from 'react';

import styles from '../styles.css';

import ButtonRight from '../../assets/button_right.svg';
import ButtonBackground from '../../assets/button_background.svg';

export default function Button({ onClick, text, left }) {
    return (
        <div
            className={styles.onboardingButtonOuter}
        >
            <div
                className={styles.onboardingButtonInner}
                onClick={onClick}
            >
                <div>
                    <img src={ButtonBackground} />
                </div>
                <div style={{ position: 'absolute', top: '16px', left: left || '5px' }} className={styles.normalText}>
                    {text}
                </div>
                <div className={styles.onboardingButtonOuterRight}>
                    <img src={ButtonRight} />
                </div>
            </div>
        </div>
    )
}