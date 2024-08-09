const getTodayHistoricalChart = async (symbol, today) => {
  const url = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?from=${today}&to=${today}&apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0 || !data) {
      throw new Error(data['Error Message']);
    }
    return data;
  } catch (error) {
    console.log(error.message);
    if (error.name === 'FetchError') {
      console.error('Network error or timeout occurred:', error.message);
  } else {
      console.error('An error occurred:', error.message);
  }
  }
};
export default getTodayHistoricalChart;
