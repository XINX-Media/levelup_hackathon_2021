import React, { useRef, useEffect, useState, useContext } from 'react';
import { Canvas, Image, Rect, Shape } from '@bucky24/react-canvas';
import { callApi } from '../Api';

import MapBackground from '../../assets/map_background.png';
import MapOverlay from '../../assets/map_overlay.png';
import { getRandomInt } from '../utils';
import UserContext from '../contexts/UserContext';
import { parentHexes } from '../config/map';
import MapHexBlur from '../../assets/map_hex_blur.png';
import CardContext from '../contexts/CardContext';

export default function Map({ onParentClick }) {
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const containerRef = useRef();
    const [cursorDownPos, setCursorDownPos] = useState(null);
    const [lastCursorPos, setLastCursorPos] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const { user } = useContext(UserContext);
    const [userTiles, setUserTiles] = useState([]);
    const { cards: filteredPublicCards } = useContext(CardContext);

    const getTiles = async () => {
        const result = await callApi('GET', "user/map", {
            user_id: user.id,
        });

        setUserTiles(result.items);
    }

    useEffect(async () => {
        if (user && user.id) {
            getTiles();
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
        let rx = x * 56;
        rx += dragOffset.x-48;
        let ry = y * 49;
        ry += dragOffset.y-10;

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

    let hexes = [];

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

    const grey = "#707085";

    const userKeys = userTiles.map(({ x, y }) => {
        return `${x}_${y}`;
    });

    const hiddenSquares = [];

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
            hexes.push({
                ...parentHex,
                type: "parent",
            });
        } else {
            const parentKey = `${parentHex.x}_${parentHex.y}`;
            if (!userKeys.includes(parentKey)) {
                hiddenSquares.push({
                    x: parentHex.x,
                    y: parentHex.y,
                });
            }
        }

        usePositions.forEach((child, index) => {
            const newX = parentHex.x + child.x;
            const newY = parentHex.y + child.y;

            if (index < unlocked) {
                const newKey = `${newX}_${newY}`;

                if (!userKeys.includes(newKey)) {
                    hiddenSquares.push({
                        x: newX,
                        y: newY,
                    });
                }
                return;
            }

            hexes.push({
                x: newX,
                y: newY,
                color: grey,//colors[getRandomInt(0, colors.length-1)],
                type: 'child',
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
                    setCursorDownPos(null);
                    if (cursorDownPos.x === x && cursorDownPos.y === y) {
                        for (const hex of hexes) {
                            if (hex.type === "child") {
                                continue;
                            }
                            const { x: rx, y: ry } = h2r(hex.x, hex.y);
                            //console.log(x, rx, y, ry);
                            const dist = Math.sqrt(Math.pow(x-rx, 2) + Math.pow(y-ry, 2));
                            //console.log(dist);
                            if (dist < hexRadius) {
                                onParentClick(hex.card_index);
                                return;
                            }
                        }

                        for (const hex of hiddenSquares) {
                            const { x: rx, y: ry } = h2r(hex.x, hex.y);
                            //console.log(x, rx, y, ry);
                            const dist = Math.sqrt(Math.pow(x-rx, 2) + Math.pow(y-ry, 2));
                            //console.log(dist);
                            if (dist < hexRadius) {
                                callApi("POST", "user/map", {
                                    user_id: user.id,
                                    x: hex.x,
                                    y: hex.y,
                                }).then(() => {
                                    getTiles();
                                });
                                return;
                            }
                        }
                    }
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
                {hiddenSquares.map(({ x, y }) => {
                    const { x: hexX, y: hexY } = getHex(x, y);
                    return (
                        <Image
                            key={`hidden_${x}_${y}`}
                            src={MapHexBlur}
                            x={hexX-27}
                            y={hexY-34}
                            width={56}
                            height={64}
                        />
                    )
                })}
            </Canvas>
        </div>
    )
}