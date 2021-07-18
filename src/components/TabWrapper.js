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
    modal,
    leftIcon,
    middleIcon,
    rightIcon,
}) {
    return (
        <div className={styles.tabWrapperOuter}>
            <div className={styles.tabWrapperContent}>
                {children}
            </div>
            <div className={styles.tabWrapperNavOuter}>
                <div className={styles.tabWrapperNavInner}>
                    <div
                        style={{
                            marginTop: '0px',
                            visibility: onLeftClicked ? 'visible' : 'hidden',
                        }}
                    >
                        <IconButton
                            width={45}
                            top={-5}
                            icon={leftIcon || ButtonArrowLeft}
                            backgroundIcon={SeptagonButtonBackground}
                            onClick={onLeftClicked}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: '0px',
                            visibility: onMiddleClicked ? 'visible' : 'hidden',
                        }}
                    >
                        <IconButton
                            width={45}
                            top={-5}
                            icon={middleIcon || PlusButtonIcon}
                            backgroundIcon={SeptagonButtonBackground}
                            onClick={onMiddleClicked}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: '0px',
                            visibility: onRightClicked ? 'visible' : 'hidden',
                        }}
                    >
                        <IconButton
                            width={45}
                            top={-5}
                            icon={rightIcon || ButtonArrowRight}
                            backgroundIcon={SeptagonButtonBackground}
                            onClick={onRightClicked}
                        />
                    </div>
                </div>
            </div>
            {modal}
        </div>
    )
}