import { Provider } from "react-redux";
import { Pokemon } from "./components/Pokemon";
import { store } from "./redux/store";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  return (
    <Provider store={store}>
      <Pokemon />
      <Todo />
    </Provider>
  );
}

export default App;
