import React from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

export default function TextPill({ text, color, onClick }) {
    return (
        <div
            className={styles.textPillOuter}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            <div className={mainStyles.subheading}>
                {text}
            </div>
        </div>
    )
}