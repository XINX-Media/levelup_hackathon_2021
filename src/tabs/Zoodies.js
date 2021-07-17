import React, { useContext, useEffect } from 'react';
import { callApi } from '../Api';

import styles from './styles.css';
import mainStyles from '../styles.css';

import TabWrapper from '../components/TabWrapper';
import ZoodyTopIcon from '../../assets/zoody_top_icon.png';
import BlobImage from '../BlobImage';
import ZoodiesStarBackground from '../../assets/zoodies_star_background.svg';
import OnboardingButton from '../OnboardingButton';
import UserContext from '../contexts/UserContext';

export default function Zoodies({ setTab }) {
    const { user, setUser } = useContext(UserContext);

    useEffect(async () => {
        if (user.ok_to_pair && !user.paired_user_id) {
            // try to connect the user
            const result = await callApi('POST', "user/connect", {
                id: user.id,
            });
            setUser(result.user);
        } else if (user.ok_to_pair && user.paired_user_id) {
            setTab('zoodies_foodies');
        }
    }, [user.ok_to_pair, user.paired_user_id]);

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
                    <BlobImage plus />
                </div>
                {!user.ok_to_pair && (
                    <>
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
                                    onClick={async () => {

                                        const result = await callApi('POST', "user/connect", {
                                            id: user.id,
                                        });
                                        setUser(result.user);
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
                {user.ok_to_pair && !user.paired_user_id && (
                    <div
                        className={mainStyles.subheading}
                        style={{
                            width: '300px',
                            textAlign: 'center',
                        }}
                    >
                        We’ll pair you up and notify you when you have a match!
                    </div>
                )}
            </div>
        </TabWrapper>
    )
}