import React from 'react';

import EmptyProfileImage from '../../assets/empty_profile_image.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import DoodButtonIcon from '../../assets/dood_button_icon.svg';

import styles from './styles.css';
import mainStyles from '../styles.css';
import BlobImage from '../BlobImage';
import StackedHearts from '../components/StackedHearts';
import SettingsRewardsBackground from '../../assets/settings_rewards_background.png';
import TabWrapper from '../components/TabWrapper';

export default function Profile({ user, setTab }) {
    return (
        <TabWrapper
            onLeftClicked={() => {
                setTab('home');
            }}
        >
            <div className={styles.profileOuter}>
                <div className={mainStyles.title} style={{ marginTop: '42px', textAlign: 'center' }}>
                    {user.blobName}
                </div>
                <div className={styles.profileImageHolder}>
                    <BlobImage />
                    <div className={styles.profileProfileImage}>
                        <img src={EmptyProfileImage} />
                        <div className={mainStyles.instructions}>
                            username
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <StackedHearts />
                    </div>
                </div>
                <div className={styles.profileButtonHolder}>
                    <div className={styles.profileButton}>
                        <div style={{ position: 'relative' }}>
                            <img src={SettingsRewardsBackground} />
                            <img
                                src={WooButtonIcon}
                                style={{
                                    position: 'absolute',
                                    width: '34px',
                                    height: '34px',
                                    left: '12px',
                                    top: '12px',
                                }}
                            />
                        </div>
                        <div className={mainStyles.subheading} style={{height: '62px', marginLeft: '15px'}}>
                            Add rewards to your map!
                        </div>
                    </div>
                    <div className={styles.profileButton} style={{ marginTop: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#c4c4c4',
                                    borderRadius: '60px',
                                }}
                            />
                            <img
                                src={FoodButtonIcon}
                                style={{
                                    position: 'absolute',
                                    width: '34px',
                                    height: '34px',
                                    left: '12px',
                                    top: '12px',
                                }}
                            />
                        </div>
                        <div className={mainStyles.subheading} style={{height: '62px', marginLeft: '15px'}}>
                            Get more than 5 custom cards!
                        </div>
                    </div>
                    <div className={styles.profileButton} style={{ marginTop: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#c4c4c4',
                                    borderRadius: '60px',
                                }}
                            />
                            <img
                                src={DoodButtonIcon}
                                style={{
                                    position: 'absolute',
                                    width: '34px',
                                    height: '34px',
                                    left: '12px',
                                    top: '12px',
                                }}
                            />
                        </div>
                        <div className={mainStyles.subheading} style={{height: '62px', marginLeft: '15px'}}>
                        Add more doods for accountability!
                        </div>
                    </div>
                </div>
            </div>
        </TabWrapper>
    )
}