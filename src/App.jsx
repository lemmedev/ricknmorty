import { Suspense, createContext, lazy, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import styles from "./app.module.css";
import Loader from "./common/loader";
import { BACKGROUND_COLOR, ERROR_TEXT, TASK_NAME, URL } from "./constants";

const Character = lazy(() => import("./pages/character"));
const CharacterDetail = lazy(() => import("./pages/characterDetail"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Character />
      </Suspense>
    ),
    errorElement: <div>{ERROR_TEXT}</div>,
  },
  {
    path: "/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <CharacterDetail />
      </Suspense>
    ),
    errorElement: <div>{ERROR_TEXT}</div>,
  },
];

const router = createBrowserRouter(routes);

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState();
  const [url, setUrl] = useState(URL);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }, []);

  return (
    <div className={styles.wrap}>
      <h1>{TASK_NAME}</h1>
      {isLoading && <Loader />}
      <DataContext.Provider
        value={{ data, setData, url, setUrl, isLoading, setIsLoading }}
      >
        <RouterProvider router={router} />
      </DataContext.Provider>
    </div>
  );
}

export default App;
