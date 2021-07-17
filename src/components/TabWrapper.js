import React from 'react';

import IconButton from '../IconButton';
import ButtonArrowLeft from '../../assets/button_arrow_left.svg';
import ButtonArrowRight from '../../assets/button_arrow_right.svg';
import PlusButtonIcon from '../../assets/plus_button_icon.svg';
import SeptagonButtonBackground from '../../assets/septagon_button_background.svg';

import styles from './styles.css';

export default function TabWrapper({
    children,
    onLeftClicked,
    onRightClicked,
    onMiddleClicked,
}) {
    return (
        <div className={styles.tabWrapperOuter}>
            <div className={styles.tabWrapperContent}>
                {children}
            </div>
            <div className={styles.tabWrapperNavOuter}>
                <div className={styles.tabWrapperNavInner}>
                    <IconButton
                        icon={ButtonArrowLeft}
                        backgroundColor="#fff"
                        onClick={onLeftClicked}
                    />
                    <div style={{ marginTop: '-10px' }}>
                        <IconButton
                            icon={PlusButtonIcon}
                            backgroundIcon={SeptagonButtonBackground}
                            onClick={onMiddleClicked}
                        />
                    </div>
                    <IconButton
                        icon={ButtonArrowRight}
                        backgroundColor="#fff"
                        onClick={onRightClicked}
                    />
                </div>
            </div>
        </div>
    )
}