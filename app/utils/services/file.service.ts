import * as path from "node:path";
import {injectable} from "inversify";
@injectable()
export class FileService {
    readonly rootPath = path.join(__dirname, '../../..');
}
