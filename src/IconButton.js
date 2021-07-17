import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

export default function IconButton({
    icon,
    onClick,
    backgroundColor,
    large,
    backgroundIcon,
}) {
    if (backgroundIcon) {
        return (
        <div
            className={classnames(
                styles.iconButtonOuter,
                large && styles.large,
            )}
            onClick={(e) => {
                if (onClick) {
                    onClick(e)
                }
            }}
        >
            <img src={backgroundIcon} />
            <img style={{ position: 'absolute', top: 0 }} src={icon} />
        </div>
        );
    }

    return (
        <div
            className={classnames(
                styles.iconButtonOuter,
                large && styles.large,
            )}
            style={{
                backgroundColor,
            }}
            onClick={(e) => {
                if (onClick) {
                    onClick(e)
                }
            }}
        >
            <img src={icon} />
        </div>
    );
}