import React from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

export default function CardPlank({ text, standard, index, swipes, onClick }) {
    return (
        <div
            className={styles.cardPlankOuter}
            onClick={onClick}
        >
            <div className={mainStyles.subheading}>
                {text}
            </div>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                {swipes}
            </div>
        </div>
    );
}