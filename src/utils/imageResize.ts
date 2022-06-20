import sharp from 'sharp';
import path from 'path';

const resizeImage = (
  height: number,
  width: number,
  filename: string
): Promise<Buffer> => {
  return sharp(path.resolve(`images/original/${filename}.jpg`))
    .resize({
      width: width,
      height: height,
      fit: sharp.fit.cover,
    })
    .toBuffer();
};

const newPath = (filename: string, height: number, width: number): string => {
  return `images/resizedImages/${filename}${width}x${height}.jpg`;
};

export { resizeImage, newPath };
