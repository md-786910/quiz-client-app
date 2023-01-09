const url =
  process.env === "devlopment"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD;

// fetch question
const fetchQuestion = async () => {
  try {
    // code
    const quesResp = await fetch(`${url}/createTestLink`, {
      method: "GET",
      credentials: "include",
    });
    const quesData = await quesResp.json();
    return { quesResp, quesData };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

const sendAnswerToServer = async (result) => {
  try {
    // code
    const resp = await fetch(`${url}/sendResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ result: result }),
    });
    const data = await resp.json();
    return { resp, data };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

// submit test using click submit btn
const submitTest = async () => {
  try {
    // code
    const resp = await fetch(`${url}/submitTest`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { resp, data };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

// get user result
const getUserResult = async () => {
  try {
    // code
    const resp = await fetch(`${url}/getUserResult`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { resp, data };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

export { fetchQuestion, sendAnswerToServer, submitTest, getUserResult };
