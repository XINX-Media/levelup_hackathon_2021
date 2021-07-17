import React from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

import TabWrapper from '../components/TabWrapper';
import ZoodyTopIcon from '../../assets/zoody_top_icon.png';
import BlobImage from '../BlobImage';
import ZoodiesStarBackground from '../../assets/zoodies_star_background.svg';
import OnboardingButton from '../OnboardingButton';

export default function Zoodies({ setTab }) {
    return (
        <TabWrapper
            onLeftClicked={() => {
                setTab('home');
            }}
        >
            <div className={styles.zoodiesTopOuter}>
                <img src={ZoodyTopIcon} />
                <div style={{ marginLeft: '9px' }}>
                    <div className={mainStyles.normalText} style={{ marginBottom: '7px' }}>
                        Stay accountable by caring for another zood!
                    </div>
                    <div className={mainStyles.instructions}>
                        Each star you give another zood is worth one heart for them and one for you.
                    </div>
                </div>
            </div>
            <div className={styles.zoodiesContent}>
                <div className={styles.zoodiesStarHolder}>
                    <div style={{ position: 'absolute' }}>
                        <img src={ZoodiesStarBackground} />
                    </div>
                    <BlobImage
                        plus
                        name="Add a zoody"
                    />
                </div>
                <div className={mainStyles.subheading}>
                    Zood + Buddy = Zoody
                </div>
                <div
                    className={mainStyles.instructions}
                    style={{
                        marginTop: '10px',
                        width: '300px',
                        textAlign: 'center',
                        marginBottom: '30px',
                    }}
                >
                    Stay accountable and partner up with another zood. Every action you take increases their heart count and yours!
                </div>
                <div style={{ width: '300px', marginBottom: '50px' }}>
                    <OnboardingButton
                        text="I want to add a friend!"
                    />
                    <div style={{ marginTop: '15px' }}>
                        <OnboardingButton
                            text="Pair me up with a zood!"
                        />
                    </div>
                </div>
            </div>
        </TabWrapper>
    )
}