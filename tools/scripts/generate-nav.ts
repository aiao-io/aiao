const fs = require('fs');
const path = require('path');
const mdFilePath = path.resolve('dist/apps/docs/docs');

function resolvePath(regex: string, innerPath: string) {
  const reg = new RegExp(regex);
  const _path = innerPath.replace(reg, '');
  return _path.replace(/\/README.*?d/g, '');
}

function generateNavItems() {
  const navItemAry = [];
  fileDisplay(mdFilePath, 'intro', navItemAry);
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath: string, parentName: string, ary: any[]) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      // console.log('files --->', files);
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        const fileDir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(fileDir, function(error, stats) {
          if (error) {
            console.warn('获取文件stats失败');
          } else {
            let navItem = {
              name: '',
              path: '',
              children: []
            };
            // 是文件
            if (stats.isFile() && /README.md/.test(filename)) {
              navItem.name = parentName;
              navItem.path = resolvePath(mdFilePath, fileDir);
              navItem = { ...navItem };
              // console.log('navItem is', navItem);
              ary.push(navItem);
            }
            // 是文件夹
            if (stats.isDirectory()) {
              fileDisplay(fileDir, filename, ary); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
  console.log('ary---->', ary);
}

// generate side nav items
generateNavItems();
