
import OnboardingBlobOne from '../../assets/onboarding_blob_1.png';
import OnboardingBlobTwo from '../../assets/onboarding_blob_2.png';
import OnboardingBlobThree from '../../assets/onboarding_blob_3.png';
import ZoodYellowBeginEat from '../../assets/zoods/zood_yellow_begin_eat.png';
import ZoodYellowEat from '../../assets/zoods/zood_yellow_eat.png';
import ZoodYellowAfterEat from '../../assets/zoods/zood_yellow_after_eat.png';
import ZoodBlueOnboarding from '../../assets/zoods/zood_blue_onboarding.png';
import ZoodPinkOnboarding from '../../assets/zoods/zood_pink_onboarding.png';
import ZoodYellowOnboarding from '../../assets/zoods/zood_yellow_onboarding.png';
import ZoodYellowHappy from '../../assets/zoods/zood_yellow_happy.gif';
import ZoodBlueHappy from '../../assets/zoods/zood_blue_happy.gif';
import ZoodPinkHappy from '../../assets/zoods/zood_pink_happy.gif';

import ZoodPinkBeginEat from '../../assets/zoods/zood_pink_begin_eat.png';
import ZoodPinkEat from '../../assets/zoods/zood_pink_eat.png';
import ZoodPinkAfterEat from '../../assets/zoods/zood_pink_after_eat.png';
import ZoodPinkOnboardingSwatchSelected from '../../assets/zoods/zood_pink_onboarding_swatch_selected.png';

import ZoodYellowOnboardingSwatchSelected from '../../assets/zoods/zood_yellow_onboarding_swatch_selected.png';

import ZoodBlueBeginEat from '../../assets/zoods/zood_blue_begin_eat.png';
import ZoodBlueEat from '../../assets/zoods/zood_blue_eat.png';
import ZoodBlueAfterEat from '../../assets/zoods/zood_blue_after_eat.png';
import ZoodBlueOnboardingSwatchSelected from '../../assets/zoods/zood_blue_onboarding_swatch_selected.png';

export default {
    // this one is blue
    blobbert: {
        name: 'Blobbert',
        color: '#f00',
        onboardingSwatch: OnboardingBlobOne,
        onboardingImage: ZoodBlueOnboarding,
        beginEatImage: ZoodBlueBeginEat,
        happyImage: ZoodBlueHappy,
        eatImage: ZoodBlueEat,
        afterEatImage: ZoodBlueAfterEat,
        onboardingSwatchSelected: ZoodBlueOnboardingSwatchSelected,
    },
    // this one is yellow
    blobana: {
        name: 'Blobana',
        color: '#0ff',
        onboardingSwatch: OnboardingBlobTwo,
        beginEatImage: ZoodYellowBeginEat,
        eatImage: ZoodYellowEat,
        afterEatImage: ZoodYellowAfterEat,
        onboardingImage: ZoodYellowOnboarding,
        happyImage: ZoodYellowHappy,
        onboardingSwatchSelected: ZoodYellowOnboardingSwatchSelected,
    },
    // this is the pink one
    blobbite: {
        name: 'Blobbite',
        color: '#00f',
        onboardingSwatch: OnboardingBlobThree,
        onboardingImage: ZoodPinkOnboarding,
        happyImage: ZoodPinkHappy,
        beginEatImage: ZoodPinkBeginEat,
        eatImage: ZoodPinkEat,
        afterEatImage: ZoodPinkAfterEat,
        onboardingSwatchSelected: ZoodPinkOnboardingSwatchSelected,
    },
};
