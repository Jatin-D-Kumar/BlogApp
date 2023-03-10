import * as api from "../api/index.js";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "auth", data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "auth", data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
export const signOut = (setLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: "signOut" });
    setLoggedIn(false);
  } catch (error) {
    console.log(error.message);
  }
};
