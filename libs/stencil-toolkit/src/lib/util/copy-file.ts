import fs from 'fs';

let copyFileWorkaround = false;
if (process.platform === 'darwin') {
  const version = process.versions.node.split('.').map(part => Number(part));
  if (version[0] < 10 || version[0] === 11 || (version[0] === 10 && version[1] < 16)) {
    copyFileWorkaround = true;
  }
}

export function copyFile(src: fs.PathLike, dest: fs.PathLike): void {
  if (copyFileWorkaround) {
    try {
      fs.unlinkSync(dest);
    } catch {}
  }

  fs.copyFileSync(src, dest, fs.constants.COPYFILE_FICLONE);
}
