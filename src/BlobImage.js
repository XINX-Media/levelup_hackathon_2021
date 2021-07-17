import React, { useContext } from 'react';
import classnames from 'classnames';

import styles from './styles.css';
import BlobBackground from '../assets/blob_background.png';
import BlobBackgroundLarge from '../assets/blob_background_large.png';
import UserContext from './contexts/UserContext';
import blobs from './config/blobs';
import ZoodNeutralOnboarding from '../assets/zoods/zood_neutral_onboarding.png';
import ZoodNeutralPlus from '../assets/zoods/zood_neutral_plus.png';

export default function BlobImage({
    large,
    name,
    gear,
    small,
    beginEat,
    eating,
    afterEating,
    blobId,
    onboarding,
    plus,
}) {
    const { user } = useContext(UserContext);
    let image;
    const id = blobId || user.blobColor;
    const blobData = blobs[id];

    //console.log(blobs, user.blobColor);
    if (blobData) {
        image = blobData.happyImage;
        if (gear) {
            image = blobData.gear;
        } else if (beginEat) {
            image = blobData.beginEatImage;
        } else if (eating) {
            image = blobData.eatImage;
        } else if (afterEating) {
            image = blobData.afterEatImage;
        } else if (onboarding) {
            image = blobData.onboardingImage;
        }
    }

    if (blobId === '' && onboarding) {
        image = ZoodNeutralOnboarding;
    }

    if (plus) {
        image = ZoodNeutralPlus;
    }

    return (
        <div className={classnames(
            styles.blobMainImage,
            large && styles.large,
            small && styles.small,
        )}>
            {!gear && <img src={large ? BlobBackgroundLarge : BlobBackground} />}
            <img
                className={classnames(
                    !large && styles.wrappedImage,
                    large && styles.wrappedImageSmaller,
                )}
                src={image}
                style={{
                    position: 'absolute',
                }}
            />
            {name && (
                <div className={classnames(styles.blobImageNameHolder, styles.normalText)}>
                    {name}
                </div>
            )}
        </div>
    )
}