import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultPage from "./pages/DefaultPage";
import NewTapPage from "./pages/NewTapPage";

function App() {
  console.log("App");
  return (
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/about" element={<NewTapPage />} />
    </Routes>
  );
}

export default App;
