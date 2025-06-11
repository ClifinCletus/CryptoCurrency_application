import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div style={{ 
      background: 'linear-gradient(180deg, rgba(0, 21, 41, 0.95) 0%, rgba(0, 21, 41, 0.8) 100%)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      position: screenSize <= 800 ? 'fixed' : 'relative',
      top: screenSize <= 800 ? 0 : 'auto',
      left: 0,
      width: screenSize <= 800 ? '100%' : '250px',
      zIndex: 1000,
      minHeight: screenSize <= 800 ? '60px' : '100vh'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #001529 0%, #0d2142 100%)',
        display: 'flex',
        padding: '25px',
        alignItems: 'center',
        width: '100%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        justifyContent: screenSize <= 800 ? 'space-between' : 'flex-start'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="https://i.ibb.co/Z11pcGG/cryptocurrency.png" size="large"/>
          <Typography.Title 
            level={2} 
            style={{
              margin: '0 0 0 15px',
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'white'
            }}
          >
            <a href="/" style={{ 
              color: 'white', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800
            }}>
              Cryptoverse
            </a>
          </Typography.Title>
        </div>
        
        {/* Only show menu button on mobile screens */}
        {screenSize <= 800 && (
          <Button 
            onClick={() => setActiveMenu(!activeMenu)}
            style={{
              fontSize: '1.2rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '12px',
              padding: '8px',
              color: 'white'
            }}
            type="text"
          >
            <MenuOutlined />
          </Button>
        )}
      </div>
      
      {/* Menu with conditional visibility */}
      <Menu 
        theme="dark" 
        style={{
          background: 'transparent',
          border: 'none',
          maxHeight: screenSize <= 800 ? (activeMenu ? '300px' : '0px') : 'none',
          overflow: screenSize <= 800 ? 'hidden' : 'visible',
          transition: 'max-height 0.3s ease'
        }}
        mode="vertical"
      >
        <Menu.Item 
          icon={<HomeOutlined />} 
          key="home"
          style={{
            padding: '15px 25px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        >    
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>  
        </Menu.Item>  
        <Menu.Item 
          icon={<FundOutlined />} 
          key="cryptocurrencies"
          style={{
            padding: '15px 25px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        >
          <a href="/cryptocurrencies" style={{ color: 'white', textDecoration: 'none' }}>Cryptocurrencies</a>
        </Menu.Item>
        <Menu.Item 
          icon={<BulbOutlined />} 
          key="news"
          style={{
            padding: '15px 25px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        >
          <a href="/news" style={{ color: 'white', textDecoration: 'none' }}>News</a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;