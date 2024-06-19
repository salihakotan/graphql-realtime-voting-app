import Footer from "./components/Footer";
import Header from "./components/Header";

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="pageContentContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newQuestion" element={<NewQuestion />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
