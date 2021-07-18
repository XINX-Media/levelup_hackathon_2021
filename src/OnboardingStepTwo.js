import React from 'react';

import BlobImage from './BlobImage';
import SpreadHearts from './components/SpreadHearts';
import IconButton from './IconButton';
import FoodButtonIcon from '../assets/food_button_icon.svg';
import WooButtonIcon from '../assets/woo_button_icon.svg';
import DoodButtonIcon from '../assets/dood_button_icon.svg';
import SoothButtonIcon from '../assets/sooth_button_icon.png';

import styles from './styles.css';
import Button from './components/Button';

export default function OnboardingStepTwo({ onForward }) {
    return (
        <div
            className={styles.centeredContent}
        >
            <div className={styles.title} style={{ marginTop: '36px' }}>
                Zood
            </div>
            <div style={{marginTop: '40px'}}>
                <BlobImage onboarding blobId='' />
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                Our daily actions can change our moods, our lives and our community. 
            </div>
            <div style={{ marginTop: '90px' }}>
                <SpreadHearts  onboarding />
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                Earn hearts every time you take care of yourself and level up!
            </div>
            <div style={{ marginTop: '90px' }}>
                <IconButton
                    icon={FoodButtonIcon}
                    backgroundColor="#5d6fcb"
                    large
                />
            </div>
            <div className={styles.instructions}>
                Care Cards
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                Take care of yourself to take care of your zood. Each self-care card completed helps your zood grow happier!
            </div>
            <div style={{ marginTop: '90px' }}>
                <IconButton
                    icon={WooButtonIcon}
                    backgroundColor="#5dcbbb"
                    large
                />
            </div>
            <div className={styles.instructions}>
                Discover
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                As your Zood’s hearts increase, you can uncover their Zoodiverse. Surprises await!
            </div>
            <div style={{ marginTop: '90px' }}>
                <IconButton
                    icon={DoodButtonIcon}
                    backgroundColor="#f6cf69"
                    large
                />
            </div>
            <div className={styles.instructions}>
                Zoodies
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                Team up with other zoodies to earn even more rewards and grow your community.
            </div>
            <div style={{ marginTop: '90px' }}>
                <IconButton
                    icon={SoothButtonIcon}
                    backgroundColor="#f09f9c"
                    large
                />
            </div>
            <div className={styles.instructions}>
                Play
            </div>
            <div className={styles.normalText} style={{ marginTop: '20px', width: '233px', textAlign: 'center', color: '#787878' }}>
                Think of these as cheat codes for self care.
            </div>
            <div style={{ marginTop: '90px', width: '260px', marginBottom: '79px' }}>
                <Button 
                    text="Explore your Zoodiverse"
                    onClick={onForward}
                />
            </div>
        </div>
    )
}