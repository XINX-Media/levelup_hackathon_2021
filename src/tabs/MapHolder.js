import React, { useContext, useState } from 'react';
import { callApi } from '../Api';

import styles from './styles.css';

import Map from '../components/Map';
import CardPlank from '../components/CardPlank';
import CardContext from '../contexts/CardContext';
import UserContext from '../contexts/UserContext';
import MapOnboardingOne from './MapOnboardingOne';
import MapOnboardingTwo from './MapOnboardingTwo';

export default function MapHolder() {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const { cards } = useContext(CardContext);
    const { user, setUser } = useContext(UserContext);
    const [onboardingStep, setOnboardingStep] = useState(0);

    if (!user.hasOnboardedMap) {
        if (onboardingStep === 0) {
            return (
                <MapOnboardingOne
                    onForward={() => {
                        setOnboardingStep(1);
                    }}
                />
            );
        } else if (onboardingStep === 1) {
            return (
                <MapOnboardingTwo
                    onForward={async () => {
                        const result = await callApi('PATCH', 'user', {
                            identifier: user.identifier,
                            changes: {
                                hasOnboardedMap: true,
                            },
                        });
                        setUser(result.user);
                    }}
                />
            );
        }
    }

    const cardData = cards[selectedCardIndex];
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Map
                    onParentClick={(index) => {
                        setSelectedCardIndex(index);
                    }}
                />
                {cardData && (
                    <div className={styles.mapPopup}>
                        <CardPlank
                            text={cardData.card_text}
                            standard
                            index={selectedCardIndex}
                            swipes={cardData.swipes}
                            onClick={() => {
                                setSelectedCardIndex(null);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}