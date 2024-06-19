import Footer from "./components/Footer";
import Header from "./components/Header";

import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";

function App() {
  return (
    <div className="App">
      <Header/>
      

    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/newQuestion" element={<NewQuestion/>}/>

    </Routes>
      


      <Footer/>
    </div>
  );
}

export default App;
