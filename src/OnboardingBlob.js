import React, { useState } from 'react';
import classnames from 'classnames';
import { callApi } from './Api';

import blobs from './config/blobs';

import Button from './components/Button';
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
                    marginTop: '40px',
                }}
            >
                Meet your zood!
            </div>
            <div
                style={{
                    marginTop: '60px',
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
                    marginTop: '44px',
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
                        >
                            {blobs[id].onboardingSwatch && blob !== id && (
                                <img src={blobs[id].onboardingSwatch} />
                            )}
                            {blobs[id].onboardingSwatchSelected && blob === id && (
                                <img src={blobs[id].onboardingSwatchSelected} />
                            )}
                        </div>;
                    })}
                </div>
            </div>
            <div
                style={{
                    marginTop: '60px',
                    marginBottom: '45px'
                }}
            >
                <Button
                    text="Pick your Care Cards"
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