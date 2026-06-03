import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('final section uses a visible spotlight layer', async () => {
  const styles = await readFile(new URL('./styles.css', import.meta.url), 'utf8');

  assert.match(styles, /\.final-section::after\s*{[\s\S]*display:\s*block/);
  assert.match(styles, /\.final-section::after\s*{[\s\S]*radial-gradient\(ellipse/);
  assert.match(styles, /\.final-section\s*{[\s\S]*--final-spotlight/);
});
