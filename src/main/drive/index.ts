
import { readdir } from 'fs';


// 数据库驱动
class Drive {
  // 当前应用程序根目录
  appRootPath: string;
  appDirs: string[] | Buffer[];
  constructor(appPath: string) {
    this.appRootPath = appPath;
    this.appDirs = [];
  }

  init () {
    readdir(this.appRootPath, {}, (err, files) => {
      if (err) {
        throw err;
      }
      console.log(1, files);
      this.appDirs = files;
    });
  }

}


export default Drive;
