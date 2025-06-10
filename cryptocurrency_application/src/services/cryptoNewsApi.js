import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': 'e99cdc3951msh7400a0be6df83fep12c82fjsnde695d9ecc51',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-BingApis-SDK': 'true'
};

//const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// Just replace your existing API with this:
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com'
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory = 'Cryptocurrency', count = 10 }) =>
        createRequest(`/api/search/NewsSearchAPI?q=${newsCategory}&pageSize=${count}&autoCorrect=true`)
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// Alternative approach using a different news API if Bing continues to fail
// You can try NewsAPI.org or other news APIs available on RapidAPI

/*
// Example alternative using NewsAPI (if you switch APIs):
const alternativeNewsHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY || 'your-api-key',
  'X-RapidAPI-Host': 'newsapi.org', // or another news API host
};

export const alternativeCryptoNewsApi = createApi({
  reducerPath: 'alternativeCryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsapi.org/v2' // or RapidAPI proxy URL
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory = 'cryptocurrency', count = 10 }) =>
        createRequest(`/everything?q=${newsCategory}&pageSize=${count}&sortBy=publishedAt`)
    })
  })
});
*/