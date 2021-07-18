import React from 'react';

import styles from './styles.css';

import OnboardingStepOneImage from '../assets/onboarding_step_one_image.png';

export default function OnboardingStepOne({ onForward }) {
    return (
        <div
            className={styles.centeredContent}
            style={{ cursor: 'pointer' }}
            onClick={onForward}
        >
            <div className={styles.title} style={{ marginTop: '60px', fontSize: '64px', lineHeight: '64px' }}>
                Zood
            </div>
            <div className={styles.normalText} style={{ marginTop: '18px'}}>
                Your Self-Care Companion
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                <img style={{ width: '100%' }} src={OnboardingStepOneImage} />
            </div>
        </div>
    )
}