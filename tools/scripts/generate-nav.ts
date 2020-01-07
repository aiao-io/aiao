const fs = require('fs');
const path = require('path');

//设置md文件位置
const mdFilePath = 'apps/docs/src/assets';

const arr = [];

function generateNavigation(dirPath: string, ary: any[], parentName = '', parentPath = '') {
  let filesList = fs.readdirSync(dirPath);
  const rPath = resolvePath(mdFilePath, parentPath);
  if (hasMdAndDir(filesList)) {
    const fileObj: any = {};
    fileObj.name = 'Introduction';
    fileObj.type = 'md';
    if (parentName && parentPath) {
      fileObj.path = rPath;
    } else {
      fileObj.path = '/';
    }
    fileObj.children = [];
    ary.push(fileObj);

    filesList = filterDir(filesList);
    for (let i = 0; i < filesList.length; i++) {
      //描述此文件/文件夹的对象
      const fObj: any = {};
      fObj.name = filesList[i];
      //拼接当前文件的路径(上一层路径+当前file的名字)
      const filePath = path.join(dirPath, filesList[i]);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        //如果是文件夹
        fObj.type = 'dir';
        fObj.path = resolvePath(mdFilePath, filePath);
        fObj.children = [];
        ary.push(fObj);
        //递归调用
        generateNavigation(filePath, ary[i + 1].children, filesList[i], filePath);
      }
    }
  } else {
    for (let i = 0; i < filesList.length; i++) {
      //描述此文件/文件夹的对象
      const fileObj: any = {};
      fileObj.name = filesList[i];
      //拼接当前文件的路径(上一层路径+当前file的名字)
      const filePath = path.join(dirPath, filesList[i]);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        //如果是文件夹
        fileObj.type = 'dir';
        fileObj.path = resolvePath(mdFilePath, filePath);
        fileObj.children = [];
        ary.push(fileObj);
        //递归调用
        generateNavigation(filePath, ary[i].children, filesList[i], filePath);
      }
    }
  }
}

function filterDir(ary: []) {
  return ary.filter(fl => !/(README|CHANGELOG).*?d/gi.test(fl));
}

function hasMdAndDir(ary: []) {
  return ary.some(fl => /(README|CHANGELOG).*?d/gi.test(fl)) && ary.some(fl => !/(README|CHANGELOG).*?d/gi.test(fl));
}

function resolvePath(regex: string, innerPath: string) {
  const reg = new RegExp(regex);
  const _path = innerPath.replace(reg, '');
  return _path.replace(/\/(README|CHANGELOG).*?d/gi, '');
}

//调用函数遍历根目录，同时传递 文件夹路径和对应的数组
//请使用同步读取
generateNavigation(mdFilePath, arr);
//读取完毕则写入到json文件中
fs.writeFileSync('dist/apps/docs/navigation.json', JSON.stringify(arr));
