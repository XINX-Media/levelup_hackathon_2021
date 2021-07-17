import React, { useState, useContext } from 'react';
import { callApi } from '../Api';
import classnames from 'classnames';

import styles from './styles.css';
import mainStyles from '../styles.css';
import OnboardingButton from '../OnboardingButton';
import UserContext from '../contexts/UserContext';

export default function AddCardModal({ close }) {
    const { user } = useContext(UserContext);
    const [popupText, setPopupText] = useState("");

    return (
<       div className={styles.onboardingBlobFoodModalOuter}>
            <div className={mainStyles.normalText} style={{textAlign: 'center'}}>
                Add a custom card!
            </div>
            <div style={{ height: '220px', marginTop: '20px', marginBottom: '20px' }}>
                <div className={mainStyles.cardSwiperCardFixed}>
                    <textarea
                        className={classnames(mainStyles.textarea, mainStyles.normalText)}
                        onChange={(e) => {
                            setPopupText(e.target.value);
                        }}
                        value={popupText}
                    ></textarea>
                </div>
            </div>
            <OnboardingButton
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