import React, { useContext } from 'react';
import { callApi } from '../Api';

import styles from './styles.css';
import mainStyles from '../styles.css';
import StackedHeartsTwo from './StackedHeartsTwo';
import TrashIcon from '../../assets/trash_icon.svg';
import UserContext from '../contexts/UserContext';

export default function CardPlank({ text, standard, index, swipes, onClick, cardId, onDelete }) {
    const { user } = useContext(UserContext);
    return (
        <div
            className={styles.cardPlankOuter}
            styles={{
                cursor: onClick ? 'pointer' : 'inherit',
            }}
            onClick={onClick}
        >
            <div className={mainStyles.subheading}>
                {text}
            </div>
            <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
                <StackedHeartsTwo swipes={swipes} />
            </div>
            {!standard && <div
                className={styles.cardPlankCardTrash}
                onClick={async (e) => {
                    e.preventDefault();
                    await callApi("DELETE", "user/cards", {
                        user_id: user.id,
                        card_id: cardId,
                    });
                    const result = await callApi("GET", "user/cards", {
                        user_id: user.id,
                    });
                    if (onDelete) {
                        onDelete()
                    }
                }}
            >
                <img src={TrashIcon} />
            </div>}
        </div>
    );
}