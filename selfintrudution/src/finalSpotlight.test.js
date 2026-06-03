import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('ending uses a visible shared spotlight layer', async () => {
  const styles = await readFile(new URL('./styles.css', import.meta.url), 'utf8');
  const socialAfter = styles.match(/\.faq-section::after\s*{(?<body>[\s\S]*?)\n}/)?.groups.body ?? '';

  assert.match(socialAfter, /radial-gradient\(ellipse/);
  assert.match(styles, /\.final-section\s*{[\s\S]*--final-spotlight/);
});

test('social and final sections share one continuous spotlight', async () => {
  const styles = await readFile(new URL('./styles.css', import.meta.url), 'utf8');
  const finalAfterBlocks = [...styles.matchAll(/\.final-section::after\s*{(?<body>[\s\S]*?)\n}/g)].map(
    (match) => match.groups.body,
  );
  const finalSectionBlocks = [...styles.matchAll(/\.final-section\s*{(?<body>[\s\S]*?)\n}/g)].map(
    (match) => match.groups.body,
  );
  const finalBeforeBlocks = [...styles.matchAll(/\.final-section::before\s*{(?<body>[\s\S]*?)\n}/g)].map(
    (match) => match.groups.body,
  );
  const finalAfter = finalAfterBlocks.at(-1) ?? '';
  const finalSection = finalSectionBlocks.at(-1) ?? '';
  const finalBefore = finalBeforeBlocks.at(-1) ?? '';

  assert.match(styles, /\.faq-section\s*{[\s\S]*--final-spotlight/);
  assert.match(styles, /\.faq-section\s*{[\s\S]*isolation:\s*isolate/);
  assert.match(styles, /\.faq-section::before\s*{[\s\S]*bottom:\s*-520px/);
  assert.match(styles, /\.faq-section\s*{[\s\S]*z-index:\s*1/);
  assert.match(styles, /\.faq-section::after\s*{[\s\S]*top:\s*12%/);
  assert.match(styles, /\.faq-section::after\s*{[\s\S]*bottom:\s*-520px/);
  assert.match(styles, /\.final-section\s*{[\s\S]*margin-top:\s*-150px/);
  assert.match(finalSection, /z-index:\s*2/);
  assert.match(finalSection, /background:\s*transparent/);
  assert.doesNotMatch(finalSection, /radial-gradient/);
  assert.match(finalBefore, /display:\s*none/);
  assert.match(finalAfter, /linear-gradient\(180deg,\s*transparent 0%/);
  assert.doesNotMatch(finalAfter, /radial-gradient/);
  assert.doesNotMatch(finalAfter, /#050505 0%/);
  assert.match(styles, /\.social-strip\s*{[\s\S]*position:\s*relative/);
});
