import React from 'react';

import styles from './styles.css';

import Arrow from '../assets/onboarding_button_arrow.svg';

export default function OnboardingButton({ onClick, text }) {
    return (
        <div
            className={styles.onboardingButtonOuter}
        >
            <div
                className={styles.onboardingButtonInner}
                onClick={onClick}
            >
                <div className={styles.normalText}>
                    {text}
                </div>
                <div className={styles.onboardingButtonOuterRight}>
                    <img src={Arrow} />
                </div>
            </div>
        </div>
    )
}