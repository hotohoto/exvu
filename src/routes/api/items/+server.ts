import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

import { parse } from 'yaml';

const BASE_DATA_DIR = './static/data';
const BASE_DATA_ACCESS_PATH = 'data';


export async function GET() {
  let folders = fs.readdirSync(BASE_DATA_DIR).map((folder: string) => {
    const folderPath = path.join(BASE_DATA_DIR, folder);
    const metaPath = path.join(folderPath, 'meta.yaml');

    let meta = { tags: [] };
    if (fs.existsSync(metaPath)) {
      meta = parse(fs.readFileSync(metaPath, 'utf8'));
    }

    const images = fs.readdirSync(folderPath).filter((file: string) => /\.(jpg|png|gif)$/i.test(file));

    return {
      name: folder,
      tags: meta.tags || [],
      images: images.map((img: string) => path.join(BASE_DATA_ACCESS_PATH, folder, img)),
    };
  });
  return json(folders);
}
