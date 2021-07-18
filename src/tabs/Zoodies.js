import React, { useContext, useEffect } from 'react';
import { callApi } from '../Api';

import styles from './styles.css';
import mainStyles from '../styles.css';

import TabWrapper from '../components/TabWrapper';
import BlobImage from '../BlobImage';
import ZoodiesStarBackground from '../../assets/zoodies_star_background.svg';
import Button from '../components/Button';
import UserContext from '../contexts/UserContext';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import ZoodNeutralSmile from '../../assets/zoods/zood_neutral_smile.png';
import ZoodiesFoodies from './ZoodiesFoodies';
import ZoodiesThreeZoods from '../../assets/zoodies_three_zoods.png';
import HeartOne from '../../assets/heart_one.png';
import StarImage from '../../assets/star_image.svg';
import CoinImage from '../../assets/coin_image.png';

export default function Zoodies({ setTab }) {
    const { user, setUser } = useContext(UserContext);

    useEffect(async () => {
        if (user.ok_to_pair && !user.paired_user_id) {
            // try to connect the user
            const result = await callApi('POST', "user/connect", {
                id: user.id,
            });
            setUser(result.user);
        }
    }, [user.ok_to_pair, user.paired_user_id]);

    if (user.ok_to_pair && user.paired_user_id) {
        return <ZoodiesFoodies
            setTab={setTab}
        />
    }

    return (
        <TabWrapper
            onMiddleClicked={() => {
                setTab('home');
            }}
            onLeftClicked={() => {
                setTab('map');
            }}
            onRightClicked={() => {
                setTab('food');
            }}
            leftIcon={WooButtonIcon}
            middleIcon={ZoodNeutralSmile}
            rightIcon={FoodButtonIcon}
        >
            <div className={styles.zoodiesContent}>
                <div className={styles.zoodiesStarHolder}>
                    <div style={{ position: 'absolute' }}>
                        <img src={ZoodiesStarBackground} />
                    </div>
                    <div className={mainStyles.title} style={{ marginTop: '84px', fontSize: '64px' }}>
                        Zoodies
                    </div>
                    <div className={mainStyles.normalText} style={{ marginTop: "14px", marginLeft: "48px" }}>
                        Friends for your zood!
                    </div>
                </div>
                <div>
                    <img src={ZoodiesThreeZoods} />
                </div>
                {!user.ok_to_pair && (
                    <>
                        <div className={mainStyles.subheading} style={{ marginTop: '60px' }}>
                            Zood + Buddy = Zoody
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '270px',
                                justifyContent: 'space-between',
                                marginTop: '55px',
                            }}
                        >
                            <div>
                                <BlobImage onboarding blobId='' small />
                                <div
                                    className={mainStyles.normalText}
                                    style={{
                                        color: "#787878",
                                        width: '99px',
                                        position: 'relative',
                                        marginTop: '30px',
                                        marginLeft: '14px',
                                    }}
                                >
                                    +1&nbsp;&nbsp;&nbsp; for the other Zood
                                    <img src={HeartOne} style={{ position: 'absolute', top: '-2px', left: "14px", width: '20px' }} />
                                </div>
                            </div>
                            <div>
                                <BlobImage small />
                                <div
                                    className={mainStyles.normalText}
                                    style={{
                                        color: "#787878",
                                        width: '99px',
                                        position: 'relative',
                                        marginTop: '30px',
                                        marginLeft: '14px',
                                    }}
                                >
                                    +1&nbsp;&nbsp;&nbsp; for the other Zood
                                    <img src={StarImage} style={{ position: 'absolute', top: '-4px', left: "14px", width: '20px' }} />
                                </div>
                            </div>
                        </div>
                        <div
                            className={mainStyles.subheading}
                            style={{
                                marginTop: '60px',
                                position: 'relative',
                                marginBottom: '20px',
                            }}
                        >
                            10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 1&nbsp;&nbsp;&nbsp;&nbsp;
                            <img src={StarImage} style={{ position: 'absolute', top: '-3px', left: "27px", width: '25px' }} />
                            <img src={CoinImage} style={{ position: 'absolute', top: '3px', left: "90px", width: '25px' }} />
                        </div>
                        <div className={mainStyles.instruction} style={{ width: '207px' }}>
                            Use your coins to purchase your prizes that you set in Discovery.
                        </div>
                        <div style={{ width: '240px', marginBottom: '50px', marginTop: '60px' }}>
                            <Button
                                text="Add a friend you know!"
                            />
                            <div style={{ marginTop: '15px' }}>
                                <Button
                                    text="Get paired with a Zood"
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
                            width: '241px',
                            textAlign: 'center',
                            marginTop: '30px',
                        }}
                    >
                        We’ll pair you up and notify you when you have a match!
                    </div>
                )}
            </div>
        </TabWrapper>
    )
}