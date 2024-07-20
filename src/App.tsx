import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/home-page/HomePage";
import {MenuItems} from "./pages/menu-items/MenuItems";

function App() {

  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='items' element={<MenuItems/>}/>
        </Routes>
    </Router>
  );
}

export default App;
