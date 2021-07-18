import React, { useState } from 'react';

import TabWrapper from './TabWrapper';
import FoodButtonIcon from '../../assets/food_button_icon.svg';
import WooButtonIcon from '../../assets/woo_button_icon.svg';
import ZoodNeutralSmile from '../../assets/zoods/zood_neutral_smile.png';
import Modal from '../Modal';
import AddCardModal from '../modals/AddCardModal';
import PlusButtonIcon from '../../assets/plus_button_icon.svg';

export default function TabWrapperStandard({ children, setTab, showAddCard, onRefreshCards, modal }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <TabWrapper
            onMiddleClicked={() => {
                setTab('home');
            }}
            onLeftClicked={() => {
                setTab('map');
            }}
            onRightClicked={() => {
                if (!showAddCard) {
                    setTab('food');
                } else {
                    setModalOpen(true);
                }
            }}
            leftIcon={WooButtonIcon}
            middleIcon={ZoodNeutralSmile}
            rightIcon={showAddCard ? PlusButtonIcon : FoodButtonIcon}
            modal={modal || (modalOpen && (
                <Modal>
                    <AddCardModal
                        close={() => {
                            setModalOpen(false);
                            if (onRefreshCards) {
                                onRefreshCards();
                            }
                        }}
                    />
                </Modal>
            ))}
        >
            {children}
        </TabWrapper>
    )
}