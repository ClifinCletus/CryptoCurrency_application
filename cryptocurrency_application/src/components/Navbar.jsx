import React from 'react'
import {useState,useEffect} from 'react';
import {Button, Menu, Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true); //used to toggle the menu visibility
  const [screenSize, setScreenSize] = useState(null); //used to track the screen size for responsive design and hence toggle the menu visibility based on screen size(navbar full visible on large screens, and a hamburger menu on small screens)

  useEffect(() => { //function to handle the screen size changes
    const handleResize = () => setScreenSize(window.innerWidth); //updates the screen size when the window is resized (window.innerWidth gives the width of the viewport in pixels)
    window.addEventListener('resize', handleResize); //adds an event listener to the window to listen for resize events
    handleResize(); //initially sets the screen size when the component mounts
    return () => window.removeEventListener('resize', handleResize); //cleans up the event listener when the component unmounts
  }, []);

  useEffect(() => { //function to handle the screen size changes
    if (screenSize < 768) { //if the screen size is less than 768 pixels, hide the menu (for mobile devices)
      setActiveMenu(false);
    }
    else {
      setActiveMenu(true); //otherwise, show the menu
    }
  }, [screenSize]); //this effect runs whenever the screen size changes


  return (
    <div className="nav-container">
      <div className="logo-container"> {/*Avatar is a component that displays an image or icon like the image or icon would be inside a round profile like icon normally seen in profiles*/}
        <Avatar src="https://i.ibb.co/Z11pcGG/cryptocurrency.png" size="large"/>
        <Typography.Title level={2} className="logo">{/* Typography is a component that displays text, it can be used to create headings, paragraphs, and other text elements */}
            <Link to="/">Cryptoverse</Link>
        </Typography.Title>

        {/*Here what done is, if the big screen(activeMenu is true, the fully show the menu, else showa this button and in the button click then shows the menu) */}
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}> {/* this button would trigger if to show the menu(navbar) or not, it would toggle on click to properly show and unshoow the menu */}
          <MenuOutlined /> {/* MenuOutlined is an icon from Ant Design that represents a menu icon */}  
        </Button>
        </div>

        {activeMenu && ( //if activeMenu is true, show the menu (navbar menu)}
        <Menu theme="dark"> {/* Menu is a component that displays a list of items, it can be used to create a navigation bar or a sidebar */}
          <Menu.Item icon={<HomeOutlined />} key="home">    
            <Link to="/">Home</Link>  
           </Menu.Item>   
            <Menu.Item icon={<FundOutlined />} key="cryptocurrencies">
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} key="news">
            <Link to="/news">News</Link>
            </Menu.Item>
        </Menu>
        )}
     </div>
  )
}

export default Navbar