const getMarketBiggestGainers = async () => {
  const url = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getMarketBiggestGainers;
