import React from 'react';

import Map from '../components/Map';
import TabWrapperStandard from '../components/TabWrapperStandard';

export default function MapHolder({ setTab }) {
    return (
        <TabWrapperStandard
            setTab={setTab}
        >
            <div style={{ width: '100%', height: '100%' }}>
                <Map />
            </div>
        </TabWrapperStandard>
    );
}