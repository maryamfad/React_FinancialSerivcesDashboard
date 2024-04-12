const getTodayHistoricalChart = async (symbol, today) => {
  const url = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?from=${today}&to=${today}&apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
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
export default getTodayHistoricalChart;
