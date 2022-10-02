import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"; //Импорт стартовой страницы

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />{" "}
      {/*Использование стартовой страницы*/}
    </Routes>
  );
}

export default App;
