import React from 'react'
import millify from 'millify'; {/* package to format numbers (to shorten very big numbers to string value*/}
import { Typography,Row,Col,Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptoStatsQuery } from '../services/cryptoApi';
import {Cryptocurrencies,News} from '../components'
import Loader from './Loader'; 

const { Title } = Typography; //used to add heading to the page

const Homepage = () => {
 const {data,error,isLoading} = useGetCryptoStatsQuery(10); //useGetCryptoStatsQuery is a custom hook that fetches the crypto stats from the API
 //data contains the stats which is what we need to display on the homepage
 if (isLoading) return <Loader/>; //if the data is still loading, display loading message
 if (error) return `Error fetching data: ${error}`; //if there is an error, display error message
  
 const globalStats = data?.data?.stats; //data is the response from the API, data.data.stats contains the stats we need
 if (!globalStats) return 'No data available'; //if there is no data, display no data message


 return (
    <> 
    <Title level={2} className="heading">
        Global Crypto Stats
    </Title>
    {/* to show the details of the coins using the col and row components from antdesign */}
    <Row> {/* Row is a component that displays a row of items, it can be used to create a grid layout */}
        {/* Col is a component that displays a column of items, it can be used to create a grid layout */ }
        {/* Statistic is a component that displays a statistic, it can be used to display a number, a percentage, or a currency value, can pass title and value */ } 
        {/* span in antdesign is the split up of screen width, it is 24 for full width and as here is 12,it covers the half way */}
      <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
      <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
      <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
      <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
      <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
    </Row> 
    
    {/* would show the text of top 10 cryptocurrencies and would show it on the cryptocurrencies component */}
    <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        <Title level={1} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>        
    </div> 
    <Cryptocurrencies simplified={true} /> {/* Cryptocurrencies is a component that displays the list of cryptocurrencies, simplified is a prop that is passed to the component to show only the top 10 cryptocurrencies */}
     {/* passing as props and would use that to fetch top 10 via adding limit on api call in api file*/}
     <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>        
    </div> 
    <News simplified={true} />  


    </>
  )
}

export default Homepage