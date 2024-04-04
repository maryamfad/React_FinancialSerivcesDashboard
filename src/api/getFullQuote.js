const getFullQuote = async (symbol) => {
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      // headers: {
      //   accept: "application/json",
      //   "APCA-API-KEY-ID": process.env.REACT_APP_ALPACA_API_KEY,
      //   "APCA-API-SECRET-KEY": process.env.REACT_APP_ALPACA_API_SECRET,
      // },
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getFullQuote;
