import React, { useState, useEffect } from 'react';

import styles from './styles.css';

export default function CardSwiper({ cards, swipeCard, height, width, onOutOfCards }) {
    const [rot, setRot] = useState(0);
    const [mouseDownCoord, setMouseDownCoord] = useState(null);
    const [activeCard, setActiveCard] = useState(0);

    const maxDeg = 45;

    useEffect(() => {
        setRot(0);
        setMouseDownCoord(null);
    }, [activeCard]);

    useEffect(() => {
        setActiveCard(0);
    }, [cards]);

    const changeRot = (newRot) => {
        if (Math.abs(newRot) >= maxDeg) {
            swipeCard(activeCard, newRot < 0);
            setRot(0);
            setMouseDownCoord(null);
            const nextIndex = activeCard + 1;
            if (nextIndex >= cards.length) {
                onOutOfCards();
            }
            setActiveCard(activeCard + 1);
        }
        setRot(newRot);
    }

    let card = null;
    if (activeCard < cards.length) {
        card = cards[activeCard];
    }

    return (
        <div className={styles.cardSwiperOuter}>
            <div
                className={styles.cardSwiperInner}
                style={{
                    height,
                    width,
                }}
            >
                {card && (
                    <>
                        <div
                            className={styles.cardSwiperCard}
                            style={{
                                position: 'relative',
                            }}
                        >
                            {card}
                        </div>
                        <div
                            className={styles.cardSwiperCard}
                            style={{
                                transform: `rotate(${rot}deg)`,
                                top: `${Math.abs(rot)*1.5}px`,
                                left: `${rot*4}px`,
                            }}
                            onTouchStart={(e) => {                 
                                const { clientX, clientY } = e.changedTouches[0];
                                setMouseDownCoord({
                                    x: clientX,
                                    y: clientY,
                                });
                            }}
                            onMouseDown={(e) => {
                                const { clientX, clientY } = e;
                                setMouseDownCoord({
                                    x: clientX,
                                    y: clientY,
                                });
                                e.preventDefault();
                            }}
                            onMouseUp={(e) => {
                                setMouseDownCoord(null);
                                setRot(0);
                            }}
                            onTouchEnd={(e) => {
                                setMouseDownCoord(null);
                                setRot(0);
                            }}
                            onTouchMove={(e) => {
                                if (mouseDownCoord) {                      
                                    const { clientX, clientY } = e.changedTouches[0];

                                    const dist = Math.sqrt(Math.pow(mouseDownCoord.y - clientY, 2) + Math.pow(mouseDownCoord.x - clientX, 2));
                                    if (clientX > mouseDownCoord.x) {
                                        changeRot(dist/4);
                                    } else {
                                        changeRot(-dist/4);
                                    }
                                }
                            }}
                            onMouseMove={(e) => {
                                if (mouseDownCoord) {
                                    e.preventDefault();                        
                                    const { clientX, clientY } = e;

                                    const dist = Math.sqrt(Math.pow(mouseDownCoord.y - clientY, 2) + Math.pow(mouseDownCoord.x - clientX, 2));
                                    if (clientX > mouseDownCoord.x) {
                                        changeRot(dist/4);
                                    } else {
                                        changeRot(-dist/4);
                                    }
                                }
                            }}
                        >
                            {card}
                        </div>
                    </>
                )}
                {!card && (
                    <div
                        className={styles.cardSwiperCardFixed}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center',
                        }}
                    >
                        <div className={styles.subheading}>No cards left!</div>
                    </div>
                )}
            </div>
        </div>
    );
}