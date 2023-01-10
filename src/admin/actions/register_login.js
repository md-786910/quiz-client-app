const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD;
const register = async (admin) => {
  try {
    const resp = await fetch(`${url}/adminRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("register error" + error.message);
  }
};

const login = async (admin) => {
  try {
    const resp = await fetch(`${url}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // added this part
      body: JSON.stringify(admin),
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("login error" + error.message);
  }
};
const adminAuth = async () => {
  try {
    const check = await fetch(`${url}/check_auth_admin`, {
      method: "GET",
      credentials: "include",
    });
    const adminData = await check.json();
    return { adminData, check };
  } catch (error) {
    alert("login error" + error.message);
  }
};

const adminLogout = async () => {
  try {
    const resp = await fetch(`${url}/admin_logout`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { data, resp };
  } catch (error) {
    alert("login error" + error.message);
  }
};

export { register, login, adminAuth, adminLogout };
