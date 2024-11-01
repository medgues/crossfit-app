import { initStateWithPrevTab } from "redux-state-sync";
import "./App.css";
import AppRouter from "./components/Router";
import { store } from "./state/store";

const App = () => {
  console.log("App");
  initStateWithPrevTab(store);

  return <AppRouter />;
};

export default App;
