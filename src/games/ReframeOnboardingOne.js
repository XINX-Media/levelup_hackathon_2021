import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css'

export default function ReframeOnboardingOne({ onForward }) {
    return (
        <div className={classnames(mainStyles.centeredContent, styles.onboardingOneOuter)}>
            <div
                className={styles.onboardingOneInner}
                onClick={onForward}
            >
                <div className={mainStyles.title} style={{ color: "#fff", padding: '12px'}}>
                    reframe your thoughts
                </div>
            </div>
        </div>
    );
}