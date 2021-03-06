import React, { useContext } from 'react';

import HeartOne from '../../assets/heart_one.png';
import HeartTwo from '../../assets/heart_two.png';
import HeartThree from '../../assets/heart_three.png';
import HeartFour from '../../assets/heart_four.png';
import HeartFive from '../../assets/heart_five.png';
import HeartSix from '../../assets/heart_six.png';

import styles from './styles.css';
import mainStyles from '../styles.css';

import HeartsContext from '../contexts/HeartsContext';

export default function SpreadHearts({ onboarding }) {
    const { hearts } = useContext(HeartsContext);

    const useHearts = onboarding ? 1830 : hearts;

    return (
        <div className={styles.spreadHeartOuter}>     
            {useHearts !== null && (
                <>
                    <img className={styles.spreadHeartHeart} src={HeartOne} />
                    {useHearts > 5 && <img className={styles.spreadHeartHeart} src={HeartTwo} />}
                    {useHearts > 25 && <img className={styles.spreadHeartHeart} src={HeartThree} />}
                    {useHearts > 100 && <img className={styles.spreadHeartHeart} src={HeartFour} />}
                    {useHearts > 250 && <img className={styles.spreadHeartHeart} src={HeartFive} />}
                    {useHearts > 500 && <img className={styles.spreadHeartHeart} src={HeartSix} />}
                    <div
                        className={mainStyles.constraints}
                        style={{
                            position: 'absolute',
                            top: '71px',
                            left: '60px',
                        }}
                    >
                        {useHearts}
                    </div>
                </>
            )}
        </div>
    )
}