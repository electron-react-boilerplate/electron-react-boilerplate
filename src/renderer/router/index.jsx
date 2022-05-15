import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

function AppRouter({ routers }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/index.html" element={<Navigate to="/"  />} />
        {routers.map((options, indx) => {
          return <Route path={options.path} element={<options.component />} key={indx} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
