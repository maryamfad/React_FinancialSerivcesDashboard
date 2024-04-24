import axios from "axios";
export const insertUserIntoUsers = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:3001/signup", {
      email,
      password,
    });
    console.log(res.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
