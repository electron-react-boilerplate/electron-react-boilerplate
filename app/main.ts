import { MainWindow } from "./windows/main.window";
import { containerHandler } from "./utils/hooks/provide.hook";
import { FileService } from "./utils/services/file.service";

try {
    containerHandler([FileService]).resolve(MainWindow);
} catch (e) {

}
