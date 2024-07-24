

export const signUp = async (username, password) => {
  try {
    const response = await fetch("https://wealthpath-385e08c18cf4.herokuapp.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log(response)
  } catch (error) {
    throw new Error(error.message);
  }
}
 

export const login = async (username, password) => {
  try {
    const response = await fetch("https://wealthpath-385e08c18cf4.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log(response)
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = () => {

};
