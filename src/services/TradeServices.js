export const buyStock = async (userId,quantity, stockSymbol, purchasePrice) => {
    try {
      const response = await fetch(
        `https://wealthpath-385e08c18cf4.herokuapp.com/trade/buy`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, quantity, stockSymbol, purchasePrice }),
        }
      );
  
      if (!response.ok) {
        const errorDetails = await response.json();
        const error = new Error("Network response was not ok");
        error.status = response.status;
        error.details = errorDetails;
        throw error;
      }
  
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  