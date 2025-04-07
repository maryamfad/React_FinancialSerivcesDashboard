const getMarketLosers = async () => {
    const url = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  export default getMarketLosers;