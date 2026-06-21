const fs = require('fs');

function getJpegSize(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    let i = 0;
    if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) {
      return null;
    }
    i += 2;
    while (i < buffer.length) {
      while (buffer[i] === 0xFF) {
        i++;
      }
      const marker = buffer[i];
      i++;
      if (marker === 0xD9 || marker === 0xDA) {
        break;
      }
      const size = buffer.readUInt16BE(i);
      if (marker >= 0xC0 && marker <= 0xC3) {
        const height = buffer.readUInt16BE(i + 3);
        const width = buffer.readUInt16BE(i + 5);
        return { width, height, aspect: width / height };
      }
      i += size;
    }
  } catch(e) {}
  return null;
}

const dir = 'public/My works/thumbnails';
fs.readdirSync(dir).forEach(file => {
  const p = dir + '/' + file;
  console.log(file, '=>', getJpegSize(p));
});
