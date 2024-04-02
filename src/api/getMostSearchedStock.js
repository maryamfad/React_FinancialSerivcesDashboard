const getMostSearchedStocks = async () => {
  const url = new URL(
    "/path",
    `https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`
  );
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
    const limitedData = data.slice(0, 100);
    return limitedData.filter((element) => {
      return element.type === "stock";
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getMostSearchedStocks;
