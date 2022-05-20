import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { RouterItem } from "./router"

function AppRouter({ routers }: { routers: RouterItem[] }) {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((options, indx) => {
          console.log(options)
          return <Route path={options.path} element={<options.component />} key={indx} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;