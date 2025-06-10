import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  // Add error handling and debugging
  console.log('coinHistory:', coinHistory);
  console.log('currentPrice:', currentPrice);
  console.log('coinName:', coinName);
  console.log('timePeriod in LineChart:', timePeriod);

  // Use useMemo to recalculate chart data when coinHistory or timePeriod changes
  const { chartData, processedData } = useMemo(() => {
    // Check if coinHistory exists and has the expected structure
    if (!coinHistory?.data?.history) {
      return { chartData: null, processedData: null };
    }

    const coinPrice = [];
    const coinTimestamp = [];

    // Process the data more safely
    coinHistory.data.history.forEach((item, index) => {
      if (item.price && item.timestamp) {
        // Convert price to number to ensure proper chart rendering
        coinPrice.push(parseFloat(item.price));
        
        // Fix timestamp conversion - multiply by 1000 if it's in seconds
        const timestamp = parseInt(item.timestamp);
        const date = new Date(timestamp > 1000000000000 ? timestamp : timestamp * 1000);
        
        // Format date more appropriately based on time period
        let dateFormat;
        if (timePeriod === '3h' || timePeriod === '24h') {
          dateFormat = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });
        } else if (timePeriod === '7d' || timePeriod === '30d') {
          dateFormat = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
        } else {
          dateFormat = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
          });
        }
        
        coinTimestamp.push(dateFormat);
      }
    });

    // Reverse arrays to show chronological order (oldest to newest)
    coinPrice.reverse();
    coinTimestamp.reverse();

    console.log('Processed coinPrice:', coinPrice.slice(0, 5)); // Log first 5 values
    console.log('Processed coinTimestamp:', coinTimestamp.slice(0, 5)); // Log first 5 values

    const data = { // Chart.js data structure
      labels: coinTimestamp, // Use formatted dates for x-axis labels
      datasets: [
        {
          label: 'Price In USD',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
          borderWidth: 2,
          pointRadius: 1,
          pointHoverRadius: 5,
          tension: 0.1, // Add slight curve to the line
        },
      ],
    };

    return { 
      chartData: data, 
      processedData: { coinPrice, coinTimestamp } 
    };
  }, [coinHistory, timePeriod]); // Dependencies: recalculate when either changes

  // Early return if no data
  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: timePeriod === '3h' || timePeriod === '24h' ? 'Time' : 'Date'
        },
        ticks: {
          maxTicksLimit: 10, // Limit number of x-axis labels
          maxRotation: 45,
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (USD)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart ({timePeriod})</Title>
        <Col className="price-container">
          <p className="price-change" style={{ color: 'red'}}>
            Change: {coinHistory?.data?.change}%
          </p>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <div style={{ height: '400px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default LineChart;