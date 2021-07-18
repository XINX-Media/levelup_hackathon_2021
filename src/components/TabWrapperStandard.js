import React from 'react';

import TabWrapper from './TabWrapper';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import ZoodNeutralSmile from '../../assets/zoods/zood_neutral_smile.png';

export default function TabWrapperStandard({ children, setTab }) {
    return (
        <TabWrapper
            onMiddleClicked={() => {
                setTab('home');
            }}
            onLeftClicked={() => {
                setTab('map');
            }}
            onRightClicked={() => {
                setTab('food');
            }}
            leftIcon={WooButtonIcon}
            middleIcon={ZoodNeutralSmile}
            rightIcon={FoodButtonIcon}
        >
            {children}
        </TabWrapper>
    )
}