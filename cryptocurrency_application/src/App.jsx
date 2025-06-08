import './App.css'
import React from 'react';
import {Routes, Route ,Link} from 'react-router-dom';
import {Layout,Typography, Space} from 'antd';
import { Navbar,Homepage,Exchanges,Cryptocurrencies,Cryptodetails,News} from './components';

function App() {

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
        </div> 
        <div className="main">
          <Layout> {/* Layout is a component that provides a structure for the application, it can be used to create a header, footer, and content area */ }
            <div className="routes"> {/* Routes is a component that allows you to define the routes for the application, it can be used to create a single page application */ }
              <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
                <Route path="/crypto/:coinId" element={<Cryptodetails/>} />
                <Route path="/exchanges" element={<Exchanges/>} />
                <Route path="/news" element={<News/>} />
              </Routes> 
            </div>
          </Layout>
          </div>
         
      
    </div>
  )
}

export default App
