import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css'

export default function MapOnboardingOne({ onForward }) {
    return (
        <div className={classnames(mainStyles.centeredContent, styles.mapOnboardingOneOuter)}>
            <div
                className={styles.mapOnboardingOneInner}
                onClick={onForward}
            >
                <div className={mainStyles.title} style={{ color: "#fff", padding: '12px'}}>
                    discover
                </div>
            </div>
        </div>
    );
}