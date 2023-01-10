const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD;
const register = async (user) => {
  try {
    const resp = await fetch(`${url}/userRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("register error" + error.message);
  }
};

const login = async (user) => {
  try {
    const resp = await fetch(`${url}/userLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // added this part
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("login error" + error.message);
  }
};
const userAuth = async () => {
  try {
    const check = await fetch(`${url}/check_auth_user`, {
      method: "GET",
      credentials: "include",
    });
    const userData = await check.json();
    return { userData, check };
  } catch (error) {
    alert("login error" + error.message);
  }
};

const userLogout = async () => {
  try {
    const resp = await fetch(`${url}/user_logout`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("login error" + error.message);
  }
};

export { register, login, userAuth, userLogout };
