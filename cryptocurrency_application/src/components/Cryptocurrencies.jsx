import React from 'react'
import millify from 'millify' // Importing millify to format large numbers
import { useGetCryptoStatsQuery } from '../services/cryptoApi'; // Importing the custom hook to fetch cryptocurrencies data
import { Card, Row, Col, Input } from 'antd' // Importing Ant Design components for layout and styling
import { Link } from 'react-router-dom' 
import { useState,useEffect } from 'react'
import Loader from './Loader';


const Cryptocurrencies = ({simplified}) => {
 const count = simplified ? 10 : 100; // If simplified is true, limit to 10 cryptocurrencies, otherwise limit to 100 and paass it to the quey and hence to api and access it

  const { data: cryptosList, isFetching } = useGetCryptoStatsQuery(count) // Fetching the list of cryptocurrencies, limiting to 100
  const [cryptos,setCryptos] = useState([]) // Extracting the coins data from the fetched list
  const [searchTerm, setSearchTerm] = useState('') // State to manage the search term input

  useEffect (() => {

    //here filtering the cryptocurrencies based on the search term, wehen swearch value changes, auto filters data
    const filteredCryptos = cryptosList?.data?.coins.filter((currency) => // Filter the cryptocurrencies based on the search term
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if the name includes the search term
      currency.symbol.toLowerCase().includes(searchTerm.toLowerCase()) // Check if the symbol includes the search term
    );
    setCryptos(filteredCryptos); 
  
  }, [cryptosList,searchTerm]) 


  if (isFetching) return <Loader/> // Display loading text while fetching data 
  if (!cryptos) return 'No data available' // Display message if no data is available

  return (
    <>

    {/*as we look, we have added the cryptocurrencies component directly on the home component, hence, would also show the input bar on the home. to avoid this we can use the simplified prop */}
    {/* how it works is, on the home component, when the cryptocurrencies is rendered on there, it would pass the simplified prop, hence the cryptocurrencies would use it and make its content same as in home page, else would remain how as in the cryptocurrencies page itself*/}

     {!simplified && ( // If simplified is false, show the search input}
     <div className="search-crypto"> {/* Search bar for filtering cryptocurrencies */}
        <Input placeholder="Search Cryptocurrency" onChange={(e) => {   
          setSearchTerm(e.target.value) // Update the search term state when input changes
        }} />
      </div>
     )}

      <Row gutter={[32, 32]} className="crypto-card-container"> {/*gutters means space between items 32 on top-bottom and 32 on left-right */}
        {cryptos ?.map((currency) => ( // Mapping through the cryptocurrencies to display each one    
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>  {/* xs, sm, lg are breakpoints for responsive design, defining how many columns to take on different screen sizes  24 is max*/}
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />} // extra is used to add additional content to the card, here it is used to show the cryptocurrency icon  
                hoverable  //hoverable means can hover
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}



export default Cryptocurrencies