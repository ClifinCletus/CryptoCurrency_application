// import React, { useState } from 'react';
// import HTMLReactParser from 'html-react-parser';
// import { useParams } from 'react-router-dom';
// import millify from 'millify';
// import { Col, Row, Typography, Select } from 'antd';
// import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
// //icons used
// import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
// //importing the api calls from cryptoApi.js
// //importing the custom hook to fetch crypto details and history

// import LineChart from './LineChart';
// import Loader from './Loader';


// const { Title, Text } = Typography;
// const { Option } = Select;  //normal Option in html

// const CryptoDetails = () => {
//   const { coinId } = useParams(); //take the coinId params from url
//   const [timePeriod, setTimeperiod] = useState('7d'); //used to render the charts with particular time period details 
//   const { data, isFetching } = useGetCryptoDetailsQuery(coinId);  //in cryptoApi.js, we added one additional endpoint(getCryptoDetails) which fetches details of each coin.
//   const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod }); //fetching the coin history based on the coinId and timeperiod selected, this would be used to show the line chart of the coin's price history
//   const cryptoDetails = data?.data?.coin;  //taking re cryptodetails
//   console.log(data)

//   if (isFetching) return <Loader />;

//   //the time,stats and genericStats are used to show the time period options, stats of the coin and generic stats of the coin respectively
//   //it is going to be used for as  a template for what all details of each coin are taken 
//   //then taken the data from cryptodetails
//   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

//   const stats = [
//     { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
//     { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
//     { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
//     { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
//     { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
//   ];

//   const genericStats = [
//     { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
//     { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
//     { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
//     { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
//     { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
//   ];

//   return (
//     <Col className="coin-detail-container">
//       <Col className="coin-heading-container">  {/*for the headings and basic coin details */}
//         <Title level={2} className="coin-name">
//           {CryptoDetails.name} ({CryptoDetails.slug}) Price {/* slug means alternate name for a coin */}
//         </Title>
//         <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
//       </Col>
//       {/* for selecting time period so that to get information as inside the chart(linechart) for the coin */}
//       <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
//         {time.map((date) => <Option key={date}>{date}</Option>)}
//       </Select>

//       {/* LineChart is a component that displays the line chart of the coin's price history */}
//       {/* coinHistory is the data that is passed to the LineChart component, it contains the price history of the coin */}
//       <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
//       <Col className="stats-container"> {/* stats-container is used to show the stats of the coin, like price, rank, volume etc. */}
//         <Col className="coin-value-statistics">
//           <Col className="coin-value-statistics-heading">
//             <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
//             <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
//           </Col>
//           {stats.map(({ icon, title, value }) => ( //mapping through the stats array and displaying each statistics of the coin
//             <Col className="coin-stats">
//               <Col className="coin-stats-name">
//                 <Text>{icon}</Text>
//                 <Text>{title}</Text>
//               </Col>
//               <Text className="stats">{value}</Text>
//             </Col>
//           ))}
//         </Col>
//         <Col className="other-stats-info"> {/* other-stats-info is used to show the other stats of the coin, like number of markets, exchanges, approved supply etc. */}
//           <Col className="coin-value-statistics-heading">
//             <Title level={3} className="coin-details-heading">Other Stats Info</Title>
//             <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
//           </Col>
//           {genericStats.map(({ icon, title, value }) => (
//             <Col className="coin-stats">
//               <Col className="coin-stats-name">
//                 <Text>{icon}</Text>
//                 <Text>{title}</Text>
//               </Col>
//               <Text className="stats">{value}</Text>
//             </Col>
//           ))}
//         </Col>
//       </Col>
//       <Col className="coin-desc-link"> {/* coin-desc-link is used to show the description and links of the coin */}
//         <Row className="coin-desc">
//           <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
//           {cryptoDetails.description ? HTMLReactParser(cryptoDetails.description) : ''} {/* HTMLReactParser is used to parse the HTML content of the description. it would be raw html, so would convert it to react code */}
//         </Row>
//         <Col className="coin-links"> {/* coin-links is used to show the links of the coin, like website, social media etc. */}
//           <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
//           {cryptoDetails.links?.map((link) => (
//             <Row className="coin-link" key={link.name}>
//               <Title level={5} className="link-name">{link.type}</Title>
//               <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a> {/* rel="noreferrer" is used to prevent the new page from accessing the original page's window object, which is a security measure */}
//             </Row>
//           ))}
//         </Col>
//       </Col>
//     </Col>
//   );
// };

// export default CryptoDetails;


//best one before changing millify
import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  
  // Fetch crypto details
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  
  // Fetch crypto history with current timePeriod
  const { 
    data: coinHistory, 
    isFetching: historyFetching
  } = useGetCryptoHistoryQuery({ 
    coinId, 
    timePeriod 
  }, {
    refetchOnMountOrArgChange: true,
    skip: false
  });
  
  const cryptoDetails = data?.data?.coin;

   console.log('cryptoDetails:', cryptoDetails);

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price ? millify(cryptoDetails.price) : 'N/A'}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank || 'N/A', icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] ? millify(cryptoDetails['24hVolume']) : 'N/A'}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap ? millify(cryptoDetails.marketCap) : 'N/A'}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price ? millify(cryptoDetails.allTimeHigh.price) : 'N/A'}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets || 'N/A', icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges || 'N/A', icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${cryptoDetails?.supply?.total ? millify(cryptoDetails.supply.total) : 'N/A'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `${cryptoDetails?.supply?.circulating ? millify(cryptoDetails.supply.circulating) : 'N/A'}`, icon: <ExclamationCircleOutlined /> },
  ];

  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);
  };

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} Price
        </Title>
        <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      
      {/* Time period selector */}
      <div style={{ marginBottom: 20 }}>
        <Select 
          value={timePeriod}
          className="select-timeperiod" 
          placeholder="Select Timeperiod" 
          onChange={handleTimePeriodChange}
          style={{ width: 200 }}
        >
          {time.map((date) => (
            <Option key={date} value={date}>{date}</Option>
          ))}
        </Select>
      </div>

      {/* Chart section */}
      {historyFetching ? (
        <Loader />
      ) : coinHistory?.data?.history ? (
        <LineChart 
          coinHistory={coinHistory} 
          currentPrice={millify(cryptoDetails?.price)} 
          coinName={cryptoDetails?.name} 
          timePeriod={timePeriod}
        />
      ) : (
        <div style={{ 
          padding: '50px', 
          textAlign: 'center', 
          backgroundColor: '#f9f9f9',
          border: '1px dashed #ccc',
          marginBottom: '20px'
        }}>
          No chart data available
        </div>
      )}

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails?.name}?</Title>
          {cryptoDetails?.description ? HTMLReactParser(cryptoDetails.description) : ''}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Links</Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;