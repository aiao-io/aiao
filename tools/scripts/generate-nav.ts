const fs = require('fs');
const path = require('path');

//设置md文件位置
const mdFilePath = 'dist/apps/docs/docs';

const arr = [];

//调用函数遍历根目录，同时传递 文件夹路径和对应的数组
//请使用同步读取
generateNavigation(mdFilePath, arr);
//读取完毕则写入到json文件中
fs.writeFileSync('dist/apps/docs/navigation.json', JSON.stringify(arr));

function generateNavigation(dirPath, ary) {
  const filesList = fs.readdirSync(dirPath);

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
      generateNavigation(filePath, ary[i].children);
    } else {
      //不是文件夹,则添加type属性为文件后缀名
      fileObj.type = path.extname(filesList[i]).substring(1);
      fileObj.path = resolvePath(mdFilePath, filePath);
      fileObj.children = [];
      ary.push(fileObj);
    }
  }
}

function resolvePath(regex: string, innerPath: string) {
  const reg = new RegExp(regex);
  const _path = innerPath.replace(reg, '');
  return _path.replace(/\/(README|CHANGELOG).*?d/gi, '');
}

function navigationFilter(navAry: any[]) {
  const filterAry = [];
  const navObj: any = {};
  if (navAry.some(nav => nav.type === 'md')) {
    navObj.name = 'Introduction';
    navObj.path = '/';
    navObj.children = [];
    filterAry.push(navObj);
  }
  navAry.map(data => {
    if (data.children.length > 0 && data.children.every(d => d.type === 'md')) {
      data.path = '';
      data.children = [];
    }
  });
}
