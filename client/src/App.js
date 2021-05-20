import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/header/Header.jsx";
import Pages from "./components/mainpages/Pages.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
