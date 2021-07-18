import React, { useContext, useState } from 'react';
import { callApi } from '../Api';
import classnames from 'classnames';

import TabWrapperStandard from '../components/TabWrapperStandard';
import TextPill from '../components/TextPill';

import styles from './styles.css';
import mainStyles from '../styles.css';
import UserContext from '../contexts/UserContext';
import ReframeOnboardingOne from './ReframeOnboardingOne';
import ReframeOnboardingTwo from './ReframeOnboardingTwo';
import ButtonTwo from '../components/ButtonTwo';
import ClearIcon from '../../assets/clear_icon.svg';
import WhiteArrow from '../../assets/onboarding_button_arrow.svg';
import Modal from '../Modal';
import ReframeWinModal from '../modals/ReframeWinModal';

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
    const { user, setUser } = useContext(UserContext);
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [showWin, setShowWin] = useState(false);

    if (!user.hasOnboardedReframe) {
        if (onboardingStep === 0) {
            return (
                <ReframeOnboardingOne
                    onForward={() => {
                        setOnboardingStep(1);
                    }}
                />
            );
        } else if (onboardingStep === 1) {
            return (
                <ReframeOnboardingTwo
                    onForward={async () => {
                        const result = await callApi('PATCH', 'user', {
                            identifier: user.identifier,
                            changes: {
                                hasOnboardedReframe: true,
                            },
                        });
                        setUser(result.user);
                    }}
                />
            );
        }
    }

    const activePhrase = phrases[currentPhraseIndex];

    return (
        <TabWrapperStandard
            setTab={setTab}
            modal={showWin && (
                <Modal>
                    <ReframeWinModal
                        onClose={() => {
                            setShowWin(false);
                            setTempPhraseIndex(currentPhraseIndex + 1);
                            setCurrentPhraseIndex(null);
                        }}
                    />
                </Modal>
            )}
        >
            <div className={styles.reframeOuter}>
                {!activePhrase && (
                    <>
                        <div className={mainStyles.subheading} style={{ marginTop: '49px', marginBottom: '40px', width: '290px' }}>
                            What are you thinking today?
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
                                        setCurrentPhraseIndex(index);
                                        setGameText('');
                                    }}
                                >
                                    <div className={mainStyles.subheading} style={{ color: "#707085" }}>
                                        {phrase}
                                    </div>
                                </div>
                            );
                        })}
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
                            <ButtonTwo
                                text="Clear"
                                onClick={() => {
                                    setGameText('');
                                }}
                                frontIcon={ClearIcon}
                            />
                            <ButtonTwo
                                text="Next"
                                onClick={() => {
                                    setShowWin(true);
                                }}
                                backIcon={WhiteArrow}
                            />
                        </div>
                    </>
                )}
            </div>
        </TabWrapperStandard>
    );
}