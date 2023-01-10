const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD;

const createQuestion = async (doc) => {
  try {
    const resp = await fetch(`${url}/createQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(doc),
    });
    const data = await resp.json();
    if (resp.status === 201) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (error) {}
};

// fetch question
const fetchQuestion = async () => {
  try {
    // code
    const resp = await fetch(`${url}/getQuestion`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { resp, data };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

// delete question
const deleteQuestion = async (id) => {
  try {
    // code
    const resp = await fetch(`${url}/deleteQuestion`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: id }),
    });
    const data = await resp.json();

    return { data, resp };
  } catch (error) {
    console.log("question fetching error" + error.message);
  }
};

// create question link

const createLink = async () => {
  try {
    const resp = await fetch(`${url}/createTest`, {
      method: "GET",
      credentials: "include",
    });
    const data = await resp.json();
    return { data, resp };
    // console.log(data);
    // console.log(resp);
  } catch (error) {
    console.log("creating question link error" + error.message);
  }
};

export { createQuestion, fetchQuestion, deleteQuestion, createLink };
