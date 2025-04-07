const getStocksNews = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "User-Agent": "request",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getStocksNews;
