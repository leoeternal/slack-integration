import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ShowTemplates from "./components/template/ShowTemplates";
import CreateTemplate from "./components/template/CreateTemplate";
import ShowUsers from "./components/user/ShowUsers";
import User from "./components/user/User";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowUsers />} />
          <Route path="/user" element={<User />} />
          <Route path="/template" element={<ShowTemplates />} />
          <Route path="/create/template" element={<CreateTemplate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
