import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultPage from "./pages/DefaultPage";
import NewTapPage from "./pages/NewTapPage";

function App() {
  console.log("App");
  return (
    // // <Router>
    //   <Routes>
    //     <Route path="/" element={<DefaultPage />} />
    //     <Route path="/new-tab" element={<NewTapPage />} />
    //   </Routes>
    // // </Router>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<DefaultPage />} />
          <Route path="about" element={<NewTapPage />} />
          {/* <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
