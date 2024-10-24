import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultPage from "./pages/DefaultPage";
import NewTapPage from "./pages/NewTapPage";
import { useEffect } from "react";
import { useTimerStore } from "./stores/useTimerStore";

const App = () => {
  console.log("App");

  return (
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/about" element={<NewTapPage />} />
    </Routes>
  );
};

export default App;
