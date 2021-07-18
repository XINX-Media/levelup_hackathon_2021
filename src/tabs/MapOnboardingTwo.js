import React from 'react';

import mainStyles from '../styles.css'

export default function MapOnboardingTwo({ onForward }) {
    return (
        <div
            className={mainStyles.centeredContent}
            onClick={onForward}
        >
            <div className={mainStyles.subheading} style={{ marginTop: '55px', width: '240px' }}>
                Your map shows you your progress.
            </div>
            <div className={mainStyles.subheading} style={{ marginTop: '84px', width: '240px' }}>
                If you complete a task, you’ll uncover an area.
            </div>
            <div className={mainStyles.subheading} style={{ marginTop: '84px', width: '240px' }}>
                Doing a task 5 times uncovers a tile.
            </div>
            <div className={mainStyles.subheading} style={{ marginTop: '84px', width: '240px', marginBottom: '30px' }}>
                As you discover more of the map, you may find rewards.
            </div>
        </div>
    );
}