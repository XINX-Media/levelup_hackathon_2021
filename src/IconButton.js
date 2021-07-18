import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

export default function IconButton({
    icon,
    onClick,
    backgroundColor,
    large,
    backgroundIcon,
    width,
    top,
    left,
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
            <img style={{ position: 'absolute', top: top || 0, width, height: width, left, }} src={icon} />
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
            <img
                src={icon}
                style={{
                    width,
                    height: width,
                    marginTop: top,
                    marginLeft: left,
                }}
            />
        </div>
    );
}