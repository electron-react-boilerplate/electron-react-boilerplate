import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import icon from "../../assets/icon.svg";
import "./App.css";
import { useElectronService } from "./utils/hooks/electron-handler.hook";
import { IPCChannelEnum } from "../../shared/enums/ipc-channel.enum";

function Hello() {
    const { ipcRenderer } = useElectronService();

    if (ipcRenderer) {
        ipcRenderer?.send(IPCChannelEnum.UPDATE_TRAY_TEXT, "hello");
    }

    return (
        <div>
            <div className="Hello">
                <img width="200" alt="icon" src={icon} />
            </div>
            <h1>electron-react-boilerplate</h1>
            <div className="Hello">
                <a
                    href="https://electron-react-boilerplate.js.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
                        Read our docs
                    </button>
                </a>
                <a
                    href="https://github.com/sponsors/electron-react-boilerplate"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
                        Donate
                    </button>
                </a>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hello />} />
            </Routes>
        </Router>
    );
}
