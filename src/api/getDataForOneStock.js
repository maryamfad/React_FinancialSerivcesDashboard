const getDataForOneStock = async () => {
  const url = new URL(
    "/path",
    "https://data.alpaca.markets/v1beta1/screener/stocks/most-actives?by=volume&top=100"
  );
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "APCA-API-KEY-ID": process.env.REACT_APP_ALPACA_API_KEY,
        "APCA-API-SECRET-KEY": process.env.REACT_APP_ALPACA_API_SECRET,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getDataForOneStock;
