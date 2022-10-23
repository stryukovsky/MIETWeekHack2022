import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import StatisticsPage from './Pages/StatisticsPage'
import Layout from '../src/Components/Layout/Layout'
import AuthPage from "./Pages/AuthPage";
import LogsPage from "./Pages/LogsPage";
import CallPage from "./Pages/CallPage";



function App() {
  return (
      <Routes>
        <Route path="app/" element={<Layout/>}>
            <Route path="app/stats" element={<StatisticsPage/>}/>
            <Route path="app/logs" element={<LogsPage/>}/>
            <Route path="app/call" element={<CallPage/>}/>

        </Route>
          <Route path="/" element={<AuthPage/>}/>
      </Routes>

  );
}

export default App;
