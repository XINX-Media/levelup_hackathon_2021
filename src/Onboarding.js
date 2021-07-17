import React, { useState } from 'react';

import OnboardingBlob from './OnboardingBlob';
import OnboardingBlobFood from './OnboardingBlobFood';

export default function Onboarding({ user, setUser }) {
    const [forceStepOne, setForceStepOne] = useState(false);

    const stepOne = !user.blobColor || forceStepOne;

    return (
        <>
            {stepOne && (
                <OnboardingBlob
                    user={user}
                    setUser={setUser}
                    onForward={() => {
                        setForceStepOne(false);
                    }}
                />
            )}
            {!stepOne && (
                <OnboardingBlobFood
                    user={user}
                    setUser={setUser}
                    goBack={() => {
                        setForceStepOne(true);
                    }}
                />
            )}
        </>
    );
}