import express from 'express';
import { resizeImage, newPath } from '../../utils/imageResize';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const outputPath: string = newPath(filename, height, width);
    
    const IMAGES: string[] = ['fjord', 'encenadaport', 'palmtunnel', 'santamonica', 'icelandwaterfall']

    
    console.log(req.query.width);
    if(req.query.width?.length == 0||req.query.height?.length == 0||req.query.filename?.length == 0)
    {
        return res.status(200).json({ message: 'please fill all the values' });
    }
    if(Number.isNaN(width) || width < 0 || width == 0)
    {
        return res.status(200).json({ message: 'width value is either 0 or negative value or not number' });
    }
    if(Number.isNaN(height)  || height < 0 || height == 0)
    {
        return res.status(200).json({ message: 'height value is either 0 or negative value or not number' });
    }
    if(!IMAGES.includes(filename)){
        return    res.status(200).json({ message: 'image doesnt exist ' });

    }

    if(!fs.existsSync(outputPath))
    {
    const resizedImage = await resizeImage(height, width, filename);
    await fsPromises.writeFile(outputPath, resizedImage);
    }

   return res.status(200).sendFile(path.resolve(outputPath));
  }  catch (error : unknown) {
    throw new Error(error as string)
  }
});

export default images;
