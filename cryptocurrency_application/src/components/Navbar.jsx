import React from 'react'
import {Button, Menu, Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container"> {/*Avatar is a component that displays an image or icon like the image or icon would be inside a round profile like icon normally seen in profiles*/}
        <Avatar src="https://www.cryptocompare.com/media/19681/crypto-compare-logo.png" size="large"/>
        <Typography.Title level={2} className="logo">{/* Typography is a component that displays text, it can be used to create headings, paragraphs, and other text elements */}
            <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        {/* <Button className="menu-control-container">
               
        </Button> */}
        </div>
        <Menu theme="dark"> {/* Menu is a component that displays a list of items, it can be used to create a navigation bar or a sidebar */}
          <Menu.Item icon={<HomeOutlined />} key="home">    
            <Link to="/">Home</Link>  
           </Menu.Item>   
            <Menu.Item icon={<FundOutlined />} key="cryptocurrencies">
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
            <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} key="news">
            <Link to="/news">News</Link>
            </Menu.Item>
        </Menu>

     </div>
  )
}

export default Navbar