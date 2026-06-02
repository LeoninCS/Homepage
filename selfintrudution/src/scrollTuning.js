const baseLenisOptions = {
  lerp: 0.1,
  syncTouch: true,
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
    syncTouch: false,
    syncTouchLerp: 0,
    touchInertiaExponent: 1,
    touchMultiplier: 1,
  },
  spring: {
    stiffnessScale: 1.12,
    dampingScale: 0.64,
  },
  inertia: {
    velocityRetain: 0.62,
    velocityInject: 0.38,
    pullMultiplier: -0.36,
    pullMin: -14,
    pullMax: 10,
    forestScaleVelocity: 0.00028,
    forestScaleMax: 0.006,
  },
};

export function getScrollTuning(isMobile) {
  return isMobile ? mobileScrollTuning : desktopScrollTuning;
}
