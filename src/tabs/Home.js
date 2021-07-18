import React from 'react';

import WooButtonIcon from '../../assets/woo_button_icon.svg';
import DoodButtonIcon from '../../assets/dood_button_icon.svg';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import SoothButtonIcon from '../../assets/sooth_button_icon.png';
import HelpIcon from '../../assets/help_icon.png';

import BlobImage from '../BlobImage';
import IconButton from'../IconButton';
import SpreadHearts from '../components/SpreadHearts';

import styles from './styles.css';
import mainStyles from '../styles.css';

export default function Home({ user, setTab }) {
    return (
        <div className={styles.homeOuter}>
            <div
                style={{
                    position: 'absolute',
                    left: "30px",
                    top: '30px',
                }}
            >
                <SpreadHearts />
            </div>
            <div className={styles.homeZoodHolder} style={{ marginTop: '131px'}}>
                <BlobImage
                    large
                    name={user.blobName}
                />
            </div>
            <div className={styles.homeYooHolder}>
                <div className={styles.homeButtonContainer}>
                    <IconButton
                        icon={FoodButtonIcon} 
                        onClick={() => {
                            setTab('food');
                        }}
                        large
                        backgroundColor="#5d6fcb"
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Care Cards
                    </div>
                </div>
            </div>
            <div className={styles.homeButtonHolder}>
                <div className={styles.homeButtonContainer}>
                    <IconButton
                        icon={WooButtonIcon}
                        backgroundColor="#5dcbbb"
                        large
                        onClick={() => {
                            setTab('map');
                        }}
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Discover
                    </div>
                </div>
                <div className={styles.homeButtonContainer} style={{marginTop: '45px'}}>
                    <IconButton
                        icon={DoodButtonIcon}
                        backgroundColor="#f6cf69"
                        large
                        onClick={() => {
                            setTab('zoodies');
                        }}
                        left={8}
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Zoodies
                    </div>
                </div>
                <div className={styles.homeButtonContainer}>
                    <IconButton
                        icon={SoothButtonIcon}
                        backgroundColor="#f09f9c"
                        large
                        onClick={() => {
                            setTab('sooth');
                        }}
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Play
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '28px', marginBottom: "16px", width: '100%', paddingLeft: '27px' }}>
                <IconButton
                    icon={HelpIcon}
                    onClick={() => {
                        setTab('onboarding_help');
                    }}
                />
            </div>
        </div>
    )
}