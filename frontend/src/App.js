import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import StatisticsPage from './Pages/StatisticsPage'
import Layout from '../src/Components/Layout/Layout'



function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/*<Route path="home" element={<LoginPage/>}/>*/}
          <Route path="stats" element={<StatisticsPage/>}/>
        </Route>
      </Routes>

  );
}

export default App;
