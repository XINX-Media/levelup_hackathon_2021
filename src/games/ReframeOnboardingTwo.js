import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css'

export default function ReframeOnboardingTwo({ onForward }) {
    return (
        <div
            className={mainStyles.centeredContent}
            onClick={onForward}
        >
            <div
                className={mainStyles.subheading}
                style={{
                    marginTop: '113px',
                    width: '277px',
                }}
            >
                Sometimes our own thoughts get in the way of taking care of ourselves.
            </div>
            <div
                className={mainStyles.subheading}
                style={{
                    marginTop: '150px',
                    width: '277px',
                }}
            >
                Let’s reframe your thoughts to help you care for you zood!
            </div>
        </div>
    );
}