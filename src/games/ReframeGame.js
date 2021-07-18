import React, { useState } from 'react';
import classnames from 'classnames';

import BlobImage from '../BlobImage';
import TabWrapperStandard from '../components/TabWrapperStandard';
import TextPill from '../components/TextPill';

import styles from './styles.css';
import mainStyles from '../styles.css';
import OnboardingButton from '../OnboardingButton';

const phrases = [
    'I can not do things.',
    'I am too tired to try.',
    'I am feeling overwhelmed.',
    'I am too slow.',
    'I am a failure.',
    'I should just give up.',
];

const words = [
    'some',
    'well',
    'try',
    'I',
    'to',
    'things',
    'can',
    'do',
];

export default function ReframeGame({ setTab }) {
    const [tempPhraseIndex, setTempPhraseIndex] = useState(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(null);
    const [gameText, setGameText] = useState('');

    const activePhrase = phrases[currentPhraseIndex];

    return (
        <TabWrapperStandard
            setTab={setTab}
        >
            <div className={styles.reframeOuter}>
                {!activePhrase && (
                    <>
                        <div style={{ width: '300px', display: 'flex', justifyContent: "space-between", marginTop: '17px' }}>
                            <TextPill text="rephrase" color="#f09f9c" />
                            <TextPill text="your" color="#ffb800" />
                            <TextPill text="thoughts" color="#5dcbbb" />
                        </div>
                        <div className={styles.reframeMidContent} style={{ marginTop: '29px' }}>
                            <BlobImage tiny />
                            <div className={mainStyles.instruction} style={{ marginLeft: '20px' }}>
                                It’s okay if you’re having a hard time taking care of your zood. Let’s get started.
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#e5e8f5',
                                width: '100%',
                                display: 'flex',
                                justifyContent: "center",
                                textAlign: 'center',
                                height: "80px",
                                alignItems: 'center',
                                marginBottom: '40px',
                            }}
                        >
                            <div className={mainStyles.subheading} style={{ width: '300px' }}>
                                What are you feeling or thinking today?
                            </div>
                        </div>
                        {phrases.map((phrase, index) => {
                            return (
                                <div
                                    key={phrase}
                                    className={classnames(
                                        styles.reframePhraseButton,
                                        tempPhraseIndex === index && styles.selected,
                                    )}
                                    onClick={() => {
                                        setTempPhraseIndex(index);
                                    }}
                                >
                                    <div className={mainStyles.subheading}>
                                        {phrase}
                                    </div>
                                </div>
                            );
                        })}
                        <div style={{ marginTop: '30px', width: '274px' }}>
                            <OnboardingButton
                                text="Get started!"
                                onClick={() => {
                                    if (tempPhraseIndex !== null) {
                                        setCurrentPhraseIndex(tempPhraseIndex);
                                        setGameText('');
                                    }
                                }}
                            />
                        </div>
                    </>
                )}
                {activePhrase && (
                    <>
                        <div style={{ marginTop: '34px' }}>
                            <TextPill text={activePhrase} color="#f0e8e8" />
                        </div>
                        <div className={styles.reframeTextBox}>
                            <div className={mainStyles.subheading}>{gameText}</div>
                        </div>
                        <div style={{ width: '247px', display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                            {words.map((word) => {
                                return <div key={word} style={{ marginRight: '10px', marginBottom: '10px' }}>
                                    <TextPill
                                        text={word}
                                        color="#f09f9c"
                                        onClick={() => {
                                            setGameText(gameText + " " + word);
                                        }}
                                    />
                                </div>
                            })}
                        </div>
                        <div style={{ width: '283px', display: 'flex', justifyContent: 'space-between', marginTop: '41px' }}>
                            <OnboardingButton
                                text="Clear"
                                onClick={() => {
                                    setGameText('');
                                }}
                            />
                            <OnboardingButton
                                text="Next"
                                onClick={() => {
                                    setTempPhraseIndex(currentPhraseIndex + 1);
                                    setCurrentPhraseIndex(null);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </TabWrapperStandard>
    );
}