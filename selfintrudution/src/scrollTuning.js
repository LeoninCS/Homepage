const baseLenisOptions = {
  lerp: 0.1,
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
  wheelMultiplier: 1,
  touchMultiplier: 1,
};

const desktopScrollTuning = {
  lenis: baseLenisOptions,
  spring: {
    stiffnessScale: 1,
    dampingScale: 1,
  },
  inertia: {
    velocityRetain: 0.82,
    velocityInject: 0.18,
    pullMultiplier: -1.24,
    pullMin: -44,
    pullMax: 28,
    forestScaleVelocity: 0.0008,
    forestScaleMax: 0.016,
  },
};

const mobileScrollTuning = {
  lenis: {
    ...baseLenisOptions,
    syncTouchLerp: 0.12,
    touchInertiaExponent: 1.42,
    touchMultiplier: 1.08,
  },
  spring: {
    stiffnessScale: 1.06,
    dampingScale: 0.78,
  },
  inertia: {
    velocityRetain: 0.74,
    velocityInject: 0.26,
    pullMultiplier: -0.84,
    pullMin: -30,
    pullMax: 20,
    forestScaleVelocity: 0.0005,
    forestScaleMax: 0.011,
  },
};

export function getScrollTuning(isMobile) {
  return isMobile ? mobileScrollTuning : desktopScrollTuning;
}
