export const getAccountOverview = async (userId) => {
  try {
    const response = await fetch(
      `https://wealthpath-385e08c18cf4.herokuapp.com/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
