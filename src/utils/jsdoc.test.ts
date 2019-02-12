import { clean } from './jsdoc';

describe('clean', () => {
  it('cleans a one line comment', () => {
    expect(clean('*\r\n * Simple one line comment')).
    toEqual(['Simple one line comment']);
  });

  it('cleans a two line comment', () => {
    expect(clean('*\r\n   * Is component disabled\r\n   * Two line comment\r\n   ')).
    toEqual(['Is component disabled','Two line comment']);
  });
})

