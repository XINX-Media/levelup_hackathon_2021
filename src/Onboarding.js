import React, { useEffect, useState } from 'react';

import OnboardingBlob from './OnboardingBlob';
import OnboardingBlobFood from './OnboardingBlobFood';
import OnboardingStepOne from './OnboardingStepOne';
import OnboardingStepTwo from './OnboardingStepTwo';

export default function Onboarding({ user, setUser }) {
    const [step, setStep] = useState(2);

    useEffect(() => {
        if (user.blobColor) {
            setStep(3);
        }
    }, [user]);

    return (
        <>
            {step === 0 && (
                <OnboardingStepOne
                    onForward={() => {
                        setStep(1);
                    }}
                />
            )}
            {step === 1 && (
                <OnboardingStepTwo
                    onForward={() => {
                        setStep(2);
                    }}
                />
            )}
            {step === 2 && (
                <OnboardingBlob
                    user={user}
                    setUser={setUser}
                />
            )}
            {step === 3 && (
                <OnboardingBlobFood
                    user={user}
                    setUser={setUser}
                />
            )}
        </>
    );
}