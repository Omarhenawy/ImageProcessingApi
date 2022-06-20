import express from 'express';
import { resizeImage, newPath } from '../../utils/imageResize';
import { promises as fsPromises } from 'fs';
import path from 'path';
const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const outputPath: string = newPath(filename);
    const resizedImage = await resizeImage(height, width, filename);
    await fsPromises.writeFile(outputPath, resizedImage);

    res.sendFile(path.resolve(outputPath));
  } catch (err: unknown) {
    res.render('error');
  }
});

export default images;
