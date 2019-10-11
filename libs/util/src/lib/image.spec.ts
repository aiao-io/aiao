import { IMAGE_MIN_BASE64_BLACK, IMAGE_MIN_BASE64_TRANSPARENT } from './image';

describe('image', () => {
  it('should true', () => {
    expect(IMAGE_MIN_BASE64_BLACK).toBeTruthy();
    expect(IMAGE_MIN_BASE64_TRANSPARENT).toBeTruthy();
  });
});
