const fs = require('fs');
const path = require('path');

//设置md文件位置
const mdFilePath = 'dist/apps/docs/docs';

const destinationFile = 'apps/docs/src/assets/navigation.json';

const arr = [];

//调用函数遍历根目录，同时传递 文件夹路径和对应的数组
//请使用同步读取
generateNavigation(mdFilePath, arr);
//读取完毕则写入到json文件中
fs.writeFileSync(destinationFile, JSON.stringify(arr));

function generateNavigation(dirPath: string, ary: any[], parentName = '', parentPath = '') {
  const filesList = fs.readdirSync(dirPath);
  const routerPath = resolvePath(mdFilePath, parentPath);

  if (hasMdAndDir(filesList)) {
    addIntroductionItem(ary, routerPath, parentName, parentPath);
    retrieveFilesList(filterDir(filesList), ary, dirPath, 1);
  } else {
    retrieveFilesList(filesList, ary, dirPath);
  }
}

function retrieveFilesList(filesList: any[], ary: any[], dirPath: string, indexPlus = 0) {
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
      generateNavigation(filePath, ary[i + indexPlus].children, filesList[i], filePath);
    }
  }
}

function addIntroductionItem(ary: any[], routerPath: string, parentName: string, parentPath: string) {
  const fileObj: any = {};
  fileObj.name = 'Introduction';
  fileObj.type = 'md';
  if (parentName && parentPath) {
    fileObj.path = routerPath;
  } else {
    fileObj.path = '/';
  }
  fileObj.children = [];
  ary.push(fileObj);
}

function filterDir(ary: []) {
  return ary.filter(fl => !/.md$/i.test(fl));
}

function hasAllMd(ary: []) {
  return ary.every(fl => /.md$/i.test(fl));
}

function hasMdAndDir(ary: []) {
  return ary.some(fl => /.md$/i.test(fl)) && ary.some(fl => !/.md$/i.test(fl));
}

function resolvePath(regex: string, innerPath: string) {
  const reg = new RegExp(regex);
  const _path = innerPath.replace(reg, '');
  return _path.replace(/\/.*?md/gi, '');
}
