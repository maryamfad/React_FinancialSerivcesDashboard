const getEndOfDayHistorical = async (symbol, start, end) => {
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${start}&to=${end}&apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
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
export default getEndOfDayHistorical;
