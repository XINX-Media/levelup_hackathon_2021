import React from 'react';

import styles from './styles.css';
import mainStyles from '../styles.css';

import BlobImage from '../BlobImage';
import TabWrapperStandard from '../components/TabWrapperStandard';
import StackedHearts from '../components/StackedHearts';

export default function Sooth({ setTab }) {

    return (
        <TabWrapperStandard
            setTab={setTab}
        >
            <div className={styles.soothOuter}>
                <div className={styles.soothTop}>
                    <div style={{ marginLeft: '10px' }}>
                        <StackedHearts />
                    </div>
                    <BlobImage small />
                </div>
                <div className={mainStyles.title} style={{ marginTop: '14px' }}>
                    Play
                </div>
                <div
                    className={styles.soothButton}
                    style={{ backgroundColor: "#5dcbbb", marginTop: '30px' }}
                    onClick={() => {
                        setTab('reframe_game');
                    }}
                >
                    <div className={mainStyles.subheading}>
                        reframe
                    </div>
                </div>
                <div
                    className={styles.soothButton}
                    style={{ backgroundColor: "#f09f9c", marginTop: '10px' }}
                >
                    <div className={mainStyles.subheading}>
                        reduce
                    </div>
                </div>
                <div
                    className={styles.soothButton}
                    style={{ backgroundColor: "#f6cf69", marginTop: '10px', marginBottom: '90px' }}
                >
                    <div className={mainStyles.subheading}>
                        remember
                    </div>
                </div>
            </div>
        </TabWrapperStandard>
    );
}