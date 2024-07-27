export const signUp = async (username, password) => {
  try {
    const response = await fetch(
      "https://wealthpath-385e08c18cf4.herokuapp.com/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      const error = new Error("Network response was not ok");
      error.status = response.status;
      error.details = errorDetails;
      console.log(error);
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(
      "https://wealthpath-385e08c18cf4.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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

export const logout = () => {};
