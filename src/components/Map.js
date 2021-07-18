import React, { useRef, useEffect, useState, useContext } from 'react';
import { Canvas, Image, Rect, Shape } from '@bucky24/react-canvas';
import { callApi } from '../Api';

import MapBackground from '../../assets/map_background.png';
import MapOverlay from '../../assets/map_overlay.png';
import { getRandomInt } from '../utils';
import UserContext from '../contexts/UserContext';
import { cards as standardCards } from '../config/cards';

export default function Map() {
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const containerRef = useRef();
    const [cursorDownPos, setCursorDownPos] = useState(null);
    const [lastCursorPos, setLastCursorPos] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [filteredPublicCards, setFilteredPublicCards] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(async () => {
        if (user && user.id) {
            const result = await callApi("GET", "user/standard_card", { id: user.id });
            const cardData = result.cards;

            const dataByIndex = cardData.reduce((obj, data) => {
                return {
                    ...obj,
                    [data.card_index]: data,
                };
            }, {});

            setFilteredPublicCards(standardCards.map((card, index) => {
                const data = dataByIndex[index];
                return {
                    card_text: card,
                    ...data,
                }
            }).filter((card) => {
                if (card.deleted) {
                    return false;
                }

                return true;
            }));
        }
    }, [user]);

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            if (canvasWidth !== width) {
                setCanvasWidth(width);
            }
            if (canvasHeight !== height) {
                setCanvasHeight(height);
            }
        }
    }, [containerRef.current]);

    const hexRadius = 32;

    const hexSpaceToRealSpace = (x, y) => {
        let rx = x * 56 + dragOffset.x-48;
        let ry = y * 49 + dragOffset.y-10;

        if (y % 2 !== 0) {
            rx += 28;
        }

        return {
            x: rx,
            y: ry,
        };
    }

    const h2r = (x, y) => {
        return hexSpaceToRealSpace(x, y);
    }

    const getHex = (x, y) => {
        const points = [];
        for (let i=0;i<360;i+=60) {
            const rad = (i+30) * (Math.PI/180);
            const x = Math.cos(rad) * hexRadius;
            const y = Math.sin(rad) * hexRadius;
            points.push({ x, y });
        }

        return {
            points,
            ...h2r(x, y),
        };
    }

    const teal = "#5dcbbb";
    const yellow = "#ffb800";
    const pink = "#f09f9c";
    const grey = "#707085";

    const parentHexes = [
        {
            x: 7, 
            y: 2,
            color: teal,
            card_index: 0,
        },
        {
            x: 4, 
            y: 3,
            color: yellow,
            card_index: 1,
        },
        {
            x: 11, 
            y: 3,
            color: teal,
            card_index: 2,
        },
        {
            x: 9, 
            y: 4,
            color: yellow,
            card_index: 3,
        },
        {
            x: 6, 
            y: 5,
            color: pink,
            card_index: 4,
        },
        {
            x: 11, 
            y: 6,
            color: pink,
            card_index: 5,
        },
        {
            x: 8, 
            y: 7,
            color: teal,
            card_index: 6,
        },
        {
            x: 6, 
            y: 8,
            color: yellow,
            card_index: 7,
        },
        {
            x: 13, 
            y: 8,
            color: teal,
            card_index: 8,
        },
        {
            x: 10, 
            y: 9,
            color: yellow,
            card_index: 9,
        },
        {
            x: 8, 
            y: 10,
            color: pink,
            card_index: 10,
        },        {
            x: 5, 
            y: 11,
            color: teal,
            card_index: 11
        },
        {
            x: 12, 
            y: 11,
            color: pink,
            card_index: 12,
        },
        {
            x: 3, 
            y: 12,
            color: yellow,
            card_index: 13,
        },
        {
            x: 10, 
            y: 12,
            color: teal,
            card_index: 14,
        },
        {
            x: 7, 
            y: 13,
            color: yellow,
            card_index: 15,
        },
        {
            x: 5, 
            y: 14,
            color: pink,
            card_index: 16,
        },
        {
            x: 9, 
            y: 15,
            color: pink,
            card_index: 17,
        },
    ];

    const hexes = [];

    const childPositionsOdd = [
        {x: 0, y: -1 },
        {x: 0, y: 1 },
        {x: -1, y: 0},
        {x: 1, y: 0},
        {x: 1, y: -1},
        {x: 1, y: 1},
    ];

    const childPositionsEven = [
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: -1, y: 1},
        {x: -1, y: 0},
        {x: -1, y: -1},
    ];

    parentHexes.forEach((parentHex) => {
        const usePositions = parentHex.y % 2 === 0 ? childPositionsEven : childPositionsOdd;
        
        const card = filteredPublicCards[parentHex.card_index];
        let swipes = 0;
        if (card) {
            swipes = card.swipes;
        }

        //swipes = 15;

        const unlocked = Math.floor(swipes/5);

        if (unlocked < 6) {
            hexes.push(parentHex);
        }

        usePositions.forEach((child, index) => {
            if (index < unlocked) {
                return;
            }
            const colors = [teal, pink, yellow];

            const newX = parentHex.x + child.x;
            const newY = parentHex.y + child.y;

            hexes.push({
                x: newX,
                y: newY,
                color: grey,//colors[getRandomInt(0, colors.length-1)],
            });
        })
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={containerRef}
        >
            <Canvas
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={({ x, y }) => {
                    setCursorDownPos({ x, y });
                    setLastCursorPos({ x, y });
                }}
                onMove={({ x, y }) => {
                    if (cursorDownPos) {
                        const xDiff = x - lastCursorPos.x;
                        const yDiff = y - lastCursorPos.y ;

                        setDragOffset({
                            x: dragOffset.x + xDiff,
                            y: dragOffset.y + yDiff,
                        });
                        setLastCursorPos({ x, y });
                    }
                }}
                onMouseUp={({ x, y }) => {
                    if (cursorDownPos.x === x && cursorDownPos.y === y) {
                        // do thing
                    }
                    setCursorDownPos(null);
                }}
            >
                <Rect
                    x={0}
                    y={0}
                    x2={canvasWidth}
                    y2={canvasHeight}
                    color="#707085"
                    fill={true}
                />
                <Image
                    src={MapBackground}
                    x={dragOffset.x}
                    y={dragOffset.y}
                    width={800}
                    height={800}
                />
                <Image
                    src={MapOverlay}
                    x={dragOffset.x}
                    y={dragOffset.y}
                    width={800}
                    height={800}
                />
                {hexes.map(({ x, y, color }) => {
                    return (
                        <Shape
                            key={`${x}_${y}`}
                            {...getHex(x, y)}
                            color={color}
                            fill
                        />
                    )
                })}
            </Canvas>
        </div>
    )
}