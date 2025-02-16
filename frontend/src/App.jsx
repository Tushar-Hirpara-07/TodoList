import "./App.css";
import AllTask from "./pages/allTask";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
