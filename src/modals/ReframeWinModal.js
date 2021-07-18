import React, { useState, useContext } from 'react';
import { callApi } from '../Api';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css';

import UserContext from '../contexts/UserContext';
import BlobImage from '../BlobImage';
import Button from '../components/Button';

export default function AddCardModal({ onClose }) {
    const { user } = useContext(UserContext);
    const [popupText, setPopupText] = useState("");

    return (
<       div className={styles.reframeWinModalOuter}>
            <div className={mainStyles.centeredContent}>
                <div className={mainStyles.subheading}>
                    YOU WIN!!
                </div>
                <BlobImage huge afterEating />
                <Button
                    text="Keep Playing"
                    onClick={onClose}
                    left={50}
                />
            </div>
        </div>
    );
}