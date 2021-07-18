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

export default function StackedHearts({ swipes }) {
    const { hearts } = useContext(HeartsContext);

    const useHearts = swipes == null ? hearts : swipes;

    return (
        <div className={styles.stack2HeartOuter}>     
            {hearts !== null && (
                <>
                    <img className={styles.stack2HeartHeart} src={HeartOne} />
                    {useHearts > 5 && <img className={styles.stack2HeartHeart} src={HeartTwo} />}
                    {useHearts > 25 && <img className={styles.stack2HeartHeart} src={HeartThree} />}
                    {useHearts > 100 && <img className={styles.stack2HeartHeart} src={HeartFour} />}
                    {useHearts > 250 && <img className={styles.stack2HeartHeart} src={HeartFive} />}
                    {useHearts > 500 && <img className={styles.stack2HeartHeart} src={HeartSix} />}
                    <div
                        className={mainStyles.constraints}
                        style={{
                            position: 'absolute',
                            top: '31px',
                            left: '30px',
                        }}
                    >
                        {useHearts}
                    </div>
                </>
            )}
        </div>
    )
}