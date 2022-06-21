import express from 'express';
import { resizeImage, newPath } from '../../utils/imageResize';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const outputPath: string = newPath(filename, height, width);
    
    const IMAGES: string[] = ['fjord', 'encenadaport', 'palmtunnel', 'santamonica', 'icelandwaterfall']

    
    console.log(width);
    if(Number.isNaN(width) || width < 0)
    {
        return res.send("width value is not existent or it's negative")
    }
    if(Number.isNaN(height)  || height < 0)
    {
        return res.send("height value is not existent or it's negative")
    }
    if(!IMAGES.includes(filename)){
        return res.send("image doesn't exist")
    }

    if(!fs.existsSync(outputPath))
    {
    const resizedImage = await resizeImage(height, width, filename);
    await fsPromises.writeFile(outputPath, resizedImage);
    }

   return res.sendFile(path.resolve(outputPath));
  }  catch (error : unknown) {
    throw new Error(`Error`)
  }
});

export default images;
