import React from 'react';

import YooButtonIcon from '../../assets/yoo_button_icon.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import DoodButtonIcon from '../../assets/dood_button_icon.svg';
import FoodButtonIcon from '../../assets/food_button_icon.svg';

import blobs from '../config/blobs';
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
                        icon={YooButtonIcon} 
                        onClick={() => {
                            setTab('profile');
                        }}
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Yoo
                    </div>
                </div>
            </div>
            <div className={styles.homeButtonHolder}>
                <div className={styles.homeButtonContainer}>
                    <IconButton
                        icon={WooButtonIcon}
                        backgroundColor="#5dcbbb"
                        large
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Woo
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
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Zoodies
                    </div>
                </div>
                <div className={styles.homeButtonContainer}>
                    <IconButton
                        icon={FoodButtonIcon}
                        backgroundColor="#f09f9c"
                        large
                        onClick={() => {
                            setTab('food');
                        }}
                    />
                    <div className={mainStyles.instructions} style={{marginTop: '5px'}}>
                        Food
                    </div>
                </div>
            </div>
            {/*
            <div>Your blob is {blobs[user.blobColor].name} and it is named {user.blobName}<br/></div>
            <div>
                you don’t have to focus on the details of  what you did yesterday, you can just do better today
            </div>
            <button
                onClick={() => {
                    setTab('food');
                }}
            >
                Food
            </button>
            
            <button
                onClick={() => {
                    setTab('wood');
                }}
            >
                Wood
            </button>
            
            <button
                onClick={() => {
                    setTab('mood');
                }}
            >
                Mood
            </button>*/}
        </div>
    )
}