import { resizeImage } from '../utils/imageResize';

describe('testing images', () => {
  it('input error ', async ():Promise<void> => {
    await expectAsync(resizeImage(200, 200, 'test')).toBeRejectedWithError(
      Error
    );
  });
  it('file exists', async ():Promise<void> => {
    await expectAsync(resizeImage(200, 200, 'palmtunnel')).toBeResolved();
  });
});
