import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import StatisticsPage from './Pages/StatisticsPage'
import Layout from '../src/Components/Layout/Layout'
import ResponsiveAppBar from './Components/ResponsiveAppBar/ResponsiveAppBar'


function App() {
  return (
      // <Routes>
      //   <Route path="/" element={<Layout/>}>
      //     {/*<Route path="home" element={<LoginPage/>}/>*/}
      //     <Route path="course" element={<StatisticsPage/>}/>
      //   </Route>
      // </Routes>
      <>
          <ResponsiveAppBar/>

      </>
  );
}

export default App;
