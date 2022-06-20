import { resizeImage } from '../utils/imageResize';

describe('testing images', () => {
  it('input error ', async () => {
    await expectAsync(resizeImage(200, 200, 'test')).toBeRejectedWithError(
      Error
    );
  });
  it('file exists', async () => {
    await expectAsync(resizeImage(200, 200, 'palmtunnel')).toBeResolved();
  });
});
