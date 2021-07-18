import React, { useContext, useState } from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

import Map from '../components/Map';
import TabWrapperStandard from '../components/TabWrapperStandard';
import BlobImage from '../BlobImage';
import { cards as standardCards } from '../config/cards';
import CardPlank from '../components/CardPlank';
import CardContext from '../contexts/CardContext';

export default function MapHolder({ setTab }) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const { cards } = useContext(CardContext);

    const cardData = cards[selectedCardIndex];
    return (
        <TabWrapperStandard
            setTab={setTab}
        >
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    height: '101px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                }}>
                    <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                        <BlobImage tiny />
                        <div className={mainStyles.normalText} style={{ marginLeft: '20px' }}>
                            Collect all the coins you earned from cards!
                        </div>
                    </div>
                </div>
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
        </TabWrapperStandard>
    );
}