const getStockLogo = async (symbol) => {
  const url = `https://financialmodelingprep.com/image-stock/${symbol}.png`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response//.json();
    // console.log('logo',data);
    return data.url;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default getStockLogo;
