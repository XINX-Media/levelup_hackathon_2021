import React from 'react';

export default function Mood({ setTab }) {
    return (
        <div>
            Mood<br/>
            <button onClick={() => { setTab('home'); }}>
                Back
            </button>
        </div>
    )
}