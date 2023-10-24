import path from 'path';
import fs from 'fs';

const dockerImagesDir = path.join(process.cwd(), 'docker-images');

const mkdirArr = [dockerImagesDir];
mkdirArr.forEach(dir => fs.existsSync(dir) || fs.mkdirSync(dir));
