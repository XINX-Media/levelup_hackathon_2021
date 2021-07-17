import React from 'react';
import classnames from 'classnames';

import styles from './styles.css';

export default function IconButton({ icon, onClick, backgroundColor, large }) {
    return (
        <div
            className={classnames(
                styles.iconButtonOuter,
                large && styles.large,
            )}
            style={{
                backgroundColor,
            }}
            onClick={onClick}
        >
            <img src={icon} />
        </div>
    );
}