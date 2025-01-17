/* eslint-disable react-hooks/exhaustive-deps */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Colorful } from '@uiw/react-color';
import './App.css';
import { useEffect, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import useChangeColorKeyboard from './hooks/useChangeColorKeyboard';
import Keyboard from './components/keyboard/Keyboard';
import { StoredData } from './types';

function Hello() {
  const [storedData, setStoredData] = useState<StoredData | null>(null);
  const [color, setColor] = useState('#1890ff');
  const [color1, setColor1] = useState('#1890ff');
  const [color2, setColor2] = useState('#1890ff');
  const [color3, setColor3] = useState('#1890ff');
  const [color4, setColor4] = useState('#1890ff');

  const [singleMode, setSingleMode] = useState(true);

  const { changeColor } = useChangeColorKeyboard();
  const value = useDebounce(color, 500);
  const valueColor1 = useDebounce(color1, 500);
  const valueColor2 = useDebounce(color2, 500);
  const valueColor3 = useDebounce(color3, 500);
  const valueColor4 = useDebounce(color4, 500);

  useEffect(() => {
    if (storedData) {
      setColor(storedData.color || '#1890ff');
      setColor1(storedData.color1 || '#1890ff');
      setColor2(storedData.color2 || '#1890ff');
      setColor3(storedData.color3 || '#1890ff');
      setColor4(storedData.color4 || '#1890ff');
      setSingleMode(storedData.singleMode ?? true);

      changeColor({
        mode: 'BRIGHTNESS',
        force: 2,
      });

      changeColor({
        mode: storedData.mode,
        force: storedData.force,
        color: storedData.color,
        color1: storedData.color1,
        color2: storedData.color2,
        color3: storedData.color3,
        color4: storedData.color4,
      });
    }
  }, [storedData]);

  useEffect(() => {
    // Charger les données enregistrées à l'ouverture de l'application
    const loadData = async () => {
      const data = await window.electron.ipcRenderer.invoke(
        'store-get',
        'dataStored',
      );

      if (data) {
        setStoredData(JSON.parse(data) as StoredData);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className="grid-container">
        <div className="child" />
        <div className="child span-5">
          <h1 className="fixed-header">Rogauracore gui</h1>
        </div>
        <div className="child">
          <button type="button" onClick={() => changeColor({ mode: 'OFF' })}>
            Off
          </button>
        </div>
      </div>

      <div className="main">
        <div className="sub-div1">
          <span>Brightness:</span>

          <button
            type="button"
            onClick={() => changeColor({ mode: 'BRIGHTNESS', force: 1 })}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => changeColor({ mode: 'BRIGHTNESS', force: 2 })}
          >
            2
          </button>

          <button
            type="button"
            onClick={() => changeColor({ mode: 'BRIGHTNESS', force: 3 })}
          >
            3
          </button>
        </div>

        <div className="sub-buttons">
          <button
            type="button"
            onClick={() =>
              setSingleMode((prev) => {
                return !prev;
              })
            }
          >
            Single color
          </button>

          <button
            type="button"
            onClick={() =>
              setSingleMode((prev) => {
                return !prev;
              })
            }
          >
            Multi color
          </button>

          <button
            type="button"
            onClick={() =>
              changeColor({ mode: 'RAINBOW', color: value, force: 1 })
            }
          >
            Raimbow 🌈
          </button>
        </div>

        <div className="sub-div">
          <div className="color-keyboard">
            {singleMode ? (
              <Colorful
                disableAlpha
                color={color}
                onChange={(col) => {
                  setColor(col.hex.replace('#', ''));
                }}
              />
            ) : (
              <>
                <Colorful
                  disableAlpha
                  color={color1}
                  onChange={(col) => {
                    setColor1(col.hex.replace('#', ''));
                  }}
                />
                <Colorful
                  disableAlpha
                  color={color2}
                  onChange={(col) => {
                    setColor2(col.hex.replace('#', ''));
                  }}
                />
                <Colorful
                  disableAlpha
                  color={color3}
                  onChange={(col) => {
                    setColor3(col.hex.replace('#', ''));
                  }}
                />
                <Colorful
                  disableAlpha
                  color={color4}
                  onChange={(col) => {
                    setColor4(col.hex.replace('#', ''));
                  }}
                />
              </>
            )}
          </div>
          <Keyboard
            color1={`#${singleMode ? color : color1}`}
            color2={`#${singleMode ? color : color2}`}
            color3={`#${singleMode ? color : color3}`}
            color4={`#${singleMode ? color : color4}`}
          />

          <button
            type="button"
            onClick={() => {
              if (!singleMode) {
                changeColor({
                  mode: 'MULTI_STATIC',
                  color1: valueColor1,
                  color2: valueColor2,
                  color3: valueColor3,
                  color4: valueColor4,
                  singleMode: false,
                });
                return;
              }

              changeColor({
                mode: 'STATIC',
                color,
                singleMode: true,
              });
            }}
          >
            Confirm
          </button>
        </div>
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
