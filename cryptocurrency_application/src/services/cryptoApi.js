import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders =  {
    'x-rapidapi-key': 'e99cdc3951msh7400a0be6df83fep12c82fjsnde695d9ecc51',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  }

  const baseUrl = 'https://coinranking1.p.rapidapi.com';

  const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoStats: builder.query({  //to get the stats of coins for home and cryptocurrencies
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoHistory: builder.query({  //to get the history of coins for the linechart
      query: ({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
    getCryptoDetails: builder.query({  //to get proper full details of coins for the cryptodetails
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
  }),
});

export const {useGetCryptoStatsQuery,useGetExchangesQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery} = cryptoApi;
