import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";

const MainLayout = lazy(() => import('./layout/MainLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const GenresPage = lazy(() => import('./pages/GenresPage'));
const TopAnimePage = lazy(() => import('./pages/TopAnimePage'));


function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/top" element={<TopAnimePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
