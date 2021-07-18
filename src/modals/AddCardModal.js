import React, { useState, useContext } from 'react';
import { callApi } from '../Api';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css';
import Button from '../components/Button';
import UserContext from '../contexts/UserContext';

export default function AddCardModal({ close }) {
    const { user } = useContext(UserContext);
    const [popupText, setPopupText] = useState("");

    return (
<       div className={styles.onboardingBlobFoodModalOuter}>
            <div className={mainStyles.normalText} style={{textAlign: 'center'}}>
                Add a custom card!
            </div>
            <div style={{ height: '220px', marginTop: '20px', marginBottom: '20px', width: '220px' }}>
                <div className={mainStyles.cardSwiperCardFixed}>
                    <textarea
                        className={classnames(mainStyles.textarea, mainStyles.normalText)}
                        onChange={(e) => {
                            setPopupText(e.target.value);
                        }}
                        value={popupText}
                        placeholder="You can add 5 cards for free!"
                    ></textarea>
                </div>
            </div>
            <Button
                text="Add card!"
                onClick={async () => {
                    if (popupText !== "") {
                        const card = await callApi("POST", "card", {
                            user_id: user.id,
                            card_text: popupText,
                        });
                    }
                    setPopupText("");
                    close();
                }}
            />
        </div>
    );
}