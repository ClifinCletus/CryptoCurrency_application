import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment' //to parse data,time etc
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi' // Importing the custom hook to fetch cryptocurrency news data
import {useState} from 'react'
import {useGetCryptoStatsQuery} from '../services/cryptoApi'
import Loader from './Loader' 

const { Text, Title } = Typography // Destructuring Typography components from Ant Design
const { Option } = Select // Destructuring Select component from Ant Design

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg' // Placeholder image for news articles

const News = ({simplified}) => {
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency') //to search news based on various cryptos or options
  const { data: cryptoNews, error, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 }) // Fetching cryptocurrency news data with a custom hook
  {/*given the newsCategory because, the news api contains a lot of news from various domains, we need only cryptocurrency and top 10 news */}
  const {data} = useGetCryptoStatsQuery(100); //to get the names of the cryptos to use it to get the news of that crypto

  console.log(cryptoNews) // Logging the fetched news data to the console

  if (isFetching) return <Loader/> // Display loading text while fetching data or if no news is available
  if(error) return `Error fetching news: ${error.message}` // Display error message if there is an error fetching the news data
  console.log(error)
  
  // Handle different API response structures
  const newsData = cryptoNews?.value || cryptoNews?.articles || cryptoNews?.data || [];
  
  return (
    <Row gutter={[24, 24]} className="news-page"> {/*gutter means space between items 24 on top-bottom and 24 on left-right */}
      <Col xs={24} className="news-heading"> {/* xs means it will take full width on extra small screens */}
        <Title level={2} className="news-title">Latest Cryptocurrency News</Title> {/* Title for the news section */}
      </Col>

      {
        !simplified && (
          <Col span={24}>
            <Select 
                showSearch 
                className='select_news'
                placeholder='search a Crypto'
                optionFilterProp='children'
                onChange={(value)=>setNewsCategory(value)}
                filterOption = {(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase())} //simply mean, to take the value selected in the option in select
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option> {/*default value. then we would take the data of all the crypto coins available and would take news of each of the coins via data from cryptoApi */}
               {
                data?.data?.coins.map((coin) => <Option value={coin.name} key={coin.uuid}>{coin.name}</Option>)
               } 
            </Select> 
          </Col> 
        )
      }

      {newsData.map((news, i) => ( // Mapping through the news data to display each news item
        <Col xs={24} sm={12} lg={8} key={i}> {/* xs, sm, lg are breakpoints for responsive design, defining how many columns to take on different screen sizes  24 is max*/}
          <Card hoverable className="news-card"> {/* Card component from Ant Design to display each news item */}
            <a href={news.url || news.link || news.webUrl} target="_blank" rel="noreferrer"> {/* Link to the news article - handles different API formats */}
              <div className="news-image-container">
                <img 
                  style={{maxWidth:'200px', maxHeight:'200px'}} 
                  src={
                    news.image?.thumbnail?.contentUrl || // Original Bing format
                    news.image?.url || // Contextual Web Search format
                    news.urlToImage || // NewsAPI format
                    news.thumbnail || // Alternative format
                    demoImage 
                  } 
                  alt="News Image" 
                />
                <Title className="news-title" level={4}>
                  {news.name || news.title} {/* Handle different title formats */}
                </Title>
              </div>
              <p>
                {moment(news.datePublished || news.publishedAt || news.published_date).startOf('ss').fromNow()}
              </p>
              <Text>
                {(news.description || news.snippet || news.content || '').length > 100 
                  ? `${(news.description || news.snippet || news.content || '').substring(0, 100)}...` 
                  : (news.description || news.snippet || news.content || 'No description available')
                }
              </Text>
              <div className='provider-container'>
                <div> 
                  <Avatar 
                    src={
                      news.provider?.[0]?.image?.thumbnail?.contentUrl || // Original Bing format
                      news.provider?.[0]?.image?.url || // Alternative format
                      news.source?.icon || // NewsAPI format
                      demoImage
                    } 
                    alt="News Provider" 
                  />
                  <Text className="provider-name">
                    {news.provider?.[0]?.name || news.source?.name || news.source || 'Unknown Source'}
                  </Text>
                </div>
                <br />
                <Text>
                  {moment(news.datePublished || news.publishedAt || news.published_date).format('YYYY-MM-DD')}
                </Text>
              </div>
           </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
 
export default News