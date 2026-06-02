import assert from 'node:assert/strict';
import test from 'node:test';

import { getScrollTuning } from './scrollTuning.js';

test('mobile scroll tuning keeps touch motion lighter than desktop', () => {
  const desktop = getScrollTuning(false);
  const mobile = getScrollTuning(true);

  assert.ok(mobile.lenis.syncTouchLerp > desktop.lenis.syncTouchLerp);
  assert.ok(mobile.lenis.touchInertiaExponent < desktop.lenis.touchInertiaExponent);
  assert.ok(mobile.spring.dampingScale < desktop.spring.dampingScale);
  assert.ok(Math.abs(mobile.inertia.pullMultiplier) < Math.abs(desktop.inertia.pullMultiplier));
  assert.ok(mobile.inertia.velocityInject > desktop.inertia.velocityInject);
});
