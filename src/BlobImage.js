import React, { useContext } from 'react';
import classnames from 'classnames';

import styles from './styles.css';
import ZoodOne from '../assets/zood_1_smile.gif';
import BlobBackground from '../assets/blob_background.png';
import BlobBackgroundLarge from '../assets/blob_background_large.png';
import UserContext from './contexts/UserContext';
import blobs from './config/blobs';

export default function BlobImage({ large, name, gear, small }) {
    const { user } = useContext(UserContext);
    let image = ZoodOne;
    const blobData = blobs[user.blobColor];

    //console.log(blobs, user.blobColor);
    if (gear && blobData) {
        image = blobData.gear;
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