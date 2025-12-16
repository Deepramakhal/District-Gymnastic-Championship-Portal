import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage.jsx";
import AdminHome from "./Components/AdminHome.jsx";
import ScoringPage from "./Components/ScoringPage.jsx";
import ScoreSheet from "./ScoreSheet.jsx";
import ConsolidatedResults from "./Components/ConsolidatedResults.jsx";
import NotFound from "./Components/NotFound.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route
          path="/scoring/:ageGroup/:type"
          element={<ScoringPage />}
        />
        <Route path="/scoresheet/:ageGroup/:type/:apparatus" element={<ScoreSheet />} />
        <Route
          path="/consolidated/:ageGroup/:type"
          element={<ConsolidatedResults />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
