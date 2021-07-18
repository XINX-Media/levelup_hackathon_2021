import React from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

export default function ButtonTwo({ onClick, text, frontIcon, backIcon }) {
    return (
        <div
            className={styles.buttonTwoOuter}
        >
            <div
                className={styles.buttonTwoInner}
                onClick={onClick}
            >
                {frontIcon && (
                    <img src={frontIcon} style={{ marginTop: '3px' }} />
                )}
                <div className={mainStyles.normalText}>
                    {text}
                </div>
                {backIcon && (
                    <img src={backIcon} style={{ marginTop: '3px', marginLeft: '10px' }} />
                )}
            </div>
        </div>
    )
}