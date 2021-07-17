import React from 'react';

import styles from './styles.css';

export default function Modal({ children }) {
    return (
        <div className={styles.modalOuter}>
            {children}
        </div>
    );
}