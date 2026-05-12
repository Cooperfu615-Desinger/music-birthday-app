import test from 'node:test';
import assert from 'node:assert/strict';

import { parseSingerRow } from '../src/utils/api.js';
import { getDaysInMonth } from '../src/utils/date.js';

test('parseSingerRow converts a valid spreadsheet row into a normalized singer', () => {
  const singer = parseSingerRow([
    '2月29日',
    'Leap Artist',
    '台灣',
    '1988',
    '跨世代創作歌手',
    '',
    'https://open.spotify.com/artist/example',
    'https://music.apple.com/tw/artist/example',
  ]);

  assert.deepEqual(singer, {
    name: 'Leap Artist',
    birthDate: '1988-02-29',
    displayDate: '1988 / 02 / 29',
    bio: '跨世代創作歌手 (台灣)',
    spotifyUrl: 'https://open.spotify.com/artist/example',
    appleUrl: 'https://music.apple.com/tw/artist/example',
  });
});

test('parseSingerRow rejects invalid or incomplete rows', () => {
  assert.equal(parseSingerRow(['Birthday', 'Name']), null);
  assert.equal(parseSingerRow(['3月2日']), null);
  assert.equal(parseSingerRow(['13/40', 'Impossible Date Artist']), null);
  assert.equal(parseSingerRow(['not a date', 'No Date Artist']), null);
});

test('getDaysInMonth returns the selectable day count for each month', () => {
  assert.equal(getDaysInMonth('2'), 29);
  assert.equal(getDaysInMonth(4), 30);
  assert.equal(getDaysInMonth(12), 31);
  assert.equal(getDaysInMonth(''), 31);
});
