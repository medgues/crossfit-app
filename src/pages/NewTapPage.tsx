import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";
import { Link } from "react-router-dom";

const NewTapPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="/about" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <Link to="/" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card bg-slate-500">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default NewTapPage;
