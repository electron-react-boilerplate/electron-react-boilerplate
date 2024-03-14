import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY2hldHQyMyIsImEiOiJjbHRvamJtZjMwaW41MmpvMXZoMDZzbGt1In0.fqQK8CfY719EsdQ3YO5N9w',
});

function Hello() {
  return (
    <Map
      // eslint-disable-next-line no-console
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <div className="flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
        <form action="" className="relative mx-auto flex">
          <input
            type="search"
            className="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent  pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"
            placeholder="Typing..."
          />
          <button className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-slate-300 rounded-lg peer-focus:relative peer-focus:rounded-l-none"></button>
        </form>
      </div>
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[46.595806, -112.027031]} />
      </Layer>
    </Map>
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
