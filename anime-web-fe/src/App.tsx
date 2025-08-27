import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import GenresPage from "./pages/GenresPage";
import TopAnimePage from "./pages/TopAnimePage";
import MainLayout from "./layout/MainLayout";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/top" element={<TopAnimePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
