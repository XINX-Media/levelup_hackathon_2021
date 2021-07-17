import React, { useState } from 'react';

import styles from './styles.css';

export default function CardSwiperTop({ cards, swipeCard, onOutOfCards, onCardDragBegin, onCardDragEnd }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [top, setTop] = useState(0);
    const [mouseDownCoord, setMouseDownCoord] = useState(null);

    const maxTop = 100;

    let card = null;
    let prevCard = null;
    let nextCard = null;
    if (cards && cards.length > 0) {
        card = cards[activeIndex];
        if (activeIndex > 0) {
            prevCard = cards[activeIndex-1];
        }

        if (activeIndex < cards.length-1) {
            nextCard = cards[activeIndex+1];
        }
    }

    const changeTop = (newTop) => {
        if (Math.abs(newTop) >= maxTop && activeIndex < cards.length) {
            swipeCard(activeIndex);
            setTop(0);
            setMouseDownCoord(null);
            const nextIndex = activeIndex + 1;
            if (nextIndex >= cards.length && onOutOfCards) {
                onOutOfCards();
            }
            setActiveIndex(nextIndex);
        }
        setTop(newTop);
    }

    return (
        <div className={styles.cardSwiperTopOuter}>
            <div className={styles.cardSwiperTopActiveCardHolder}>
                <div className={styles.cardSwiperCard} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div className={styles.subheading}>
                        {card || "No cards left!"}
                    </div>
                </div>
                <div
                    className={styles.cardSwiperCard}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        left: 0,
                        top,
                    }}
                    onTouchStart={(e) => {                 
                        const { clientX, clientY } = e.changedTouches[0];
                        setMouseDownCoord({
                            x: clientX,
                            y: clientY,
                        });
                        if (onCardDragBegin && activeIndex < cards.length) {
                            onCardDragBegin();
                        }
                    }}
                    onMouseDown={(e) => {
                        const { clientX, clientY } = e;
                        setMouseDownCoord({
                            x: clientX,
                            y: clientY,
                        });
                        e.preventDefault();
                        if (onCardDragBegin && activeIndex < cards.length) {
                            onCardDragBegin();
                        }
                    }}
                    onMouseUp={(e) => {
                        setMouseDownCoord(null);
                        setTop(0);
                        if (onCardDragEnd) {
                            onCardDragEnd();
                        }
                    }}
                    onTouchEnd={(e) => {
                        setMouseDownCoord(null);
                        setTop(0);
                        if (onCardDragEnd) {
                            onCardDragEnd();
                        }
                    }}
                    onTouchMove={(e) => {
                        if (mouseDownCoord) {                      
                            const { clientY } = e.changedTouches[0];

                            const dist = Math.sqrt(Math.pow(mouseDownCoord.y - clientY, 2));
                            changeTop(-dist);
                        }
                    }}
                    onMouseMove={(e) => {
                        if (mouseDownCoord) {
                            e.preventDefault();                        
                            const { clientY } = e;

                            const dist = Math.sqrt(Math.pow(mouseDownCoord.y - clientY, 2));
                            changeTop(-dist);
                        }
                    }}
                >
                    <div className={styles.subheading}>
                        {card || "No cards left!"}
                    </div>
                </div>
            </div>
            {prevCard && (
                <div
                    className={styles.cardSwiperTopInactiveCardHolder}
                    style={{
                        left: 0,
                    }}
                >
                    <div className={styles.cardSwiperCard} style={{ display: 'flex', alignItems: 'center' }}>
                        {prevCard}
                    </div>
                </div>
            )}
            {nextCard && (
                <div
                    className={styles.cardSwiperTopInactiveCardHolder}
                    style={{
                        right: 0,
                    }}
                >
                    <div className={styles.cardSwiperCard} style={{ display: 'flex', alignItems: 'center' }}>
                        {nextCard}
                    </div>
                </div>
            )}
        </div>
    );
}