const getStocksList = async () => {
  const url = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.REACT_APP_FINANCIAL_MODELING_PREP_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    //   const limitedData = data.slice(0, 100);
    return data.filter(
      (element) =>
        element.type === "stock" && element.symbol.indexOf(".") === -1
    );
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getStocksList;
