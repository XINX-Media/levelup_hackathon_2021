import React, { useState } from 'react';
import classnames from 'classnames';
import { callApi } from './Api';

import blobs from './config/blobs';

import OnboardingButton from './OnboardingButton';
import BlobImage from './BlobImage';

import styles from './styles.css';

export default function OnboardingBlob({ user, setUser, onForward }) {
    const [blob, setBlob] = useState(user.blobColor || '');
    const [blobName, setBlobName] = useState(user.blobName || '');
    return (
        <div className={styles.onboardingBlobOuter}>
            <div
                className={styles.heading}
                style={{
                    marginTop: '30px',
                }}
            >
                Meet your zood!
            </div>
            <div
                style={{
                    marginTop: '34px',
                    width: '300px'
                }}
            >
                <input
                    className={classnames(styles.input, styles.normalText)}
                    type="text"
                    onChange={(e) => {
                        setBlobName(e.target.value);
                    }}
                    value={blobName}
                    placeholder="Enter your zood's name here"
                />
            </div>
            <div
                className={styles.constraints}
                style={{
                    marginTop: '5px',
                }}
            >
                (15 characters)
            </div>
            <div
                style={{
                    marginTop: '15px',
                }}
                className={styles.onboardingBlobImageHolder}
            >
                <BlobImage
                    blobId={blob}
                    onboarding
                />
                <div className={styles.onboardingBlobColorHolder}>
                    {Object.keys(blobs).map((id) => {
                        return <div
                            key={id}
                            onClick={() => {
                                setBlob(id);
                            }}
                            className={classnames(
                                styles.onboardingBlobColor,
                                blob === id && styles.selected,
                            )}
                            style={{
                                backgroundColor: blobs[id].color,
                            }}
                        >
                            {blobs[id].onboardingSwatch && (
                                <img src={blobs[id].onboardingSwatch} />
                            )}
                        </div>;
                    })}
                </div>
            </div>
            <div
                style={{
                    marginTop: '20px',
                    width: '300px',
                    textAlign: 'center',
                }}
                className={styles.instructions}
            >
                You’ll be responsible for taking care of this little zood here.
            </div>
            <div
                style={{
                    marginTop: '17px',
                    textAlign: 'center',
                }}
                className={styles.instructions}
            >
                Pick a color and name for your buddy!
            </div>
            <div
                style={{
                    marginTop: '24px',
                    width: '100%',
                    marginBottom: '45px'
                }}
            >
                <OnboardingButton
                    text="Get food for your zood"
                    onClick={async () => {
                        if (blob === '' || blobName === '') {
                            return;
                        }
                        onForward();
                        const result = await callApi('PATCH', 'user', {
                            identifier: user.identifier,
                            changes: {
                                blobColor: blob,
                                blobName,
                            },
                        });
                        setUser(result.user);
                    }}
                />
            </div>
        </div>
    )
}