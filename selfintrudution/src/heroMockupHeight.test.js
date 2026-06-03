import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('hero mockup extends lower behind the foreground', async () => {
  const styles = await readFile(new URL('./styles.css', import.meta.url), 'utf8');

  assert.match(styles, /\.hero\s*{[\s\S]*min-height:\s*clamp\(1140px,\s*88vw,\s*1348px\)/);
  assert.match(styles, /\.hero-device \.product-mockup,[\s\S]*?\.product-mockup\s*{[\s\S]*min-height:\s*820px/);
  assert.match(styles, /@media \(max-width:\s*560px\)[\s\S]*\.hero-device \.product-mockup,[\s\S]*?\.product-mockup\s*{[\s\S]*min-height:\s*590px/);
  assert.match(styles, /\.mock-panel\s*{[\s\S]*margin-top:\s*-256px/);
});
