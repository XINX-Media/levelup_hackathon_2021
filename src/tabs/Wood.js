import React from 'react';

export default function Wood({ setTab }) {
    return (
        <div>
            Wood<br/>
            <button onClick={() => { setTab('home'); }}>
                Back
            </button>
        </div>
    )
}