import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../client/actions/user_register_login";
import {
  fetchQuestion,
  submitTest,
  getUserResult,
  sendAnswerToServer,
} from "../../client/actions/userApi.js";
import TestCard from "./TestCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Result",
    },
  },
};

// const labels = ["score", "p2ip"];

function TestPage() {
  let count = 0;
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);
  const [ind, setInd] = useState(0);
  const [q, setQ] = useState([]);
  const [isCompleted, setIsCompleted] = useState();
  const [data1, setData1] = useState([]);
  let [correct, setCorrect] = useState(count);
  // check auth admin
  async function auth() {
    const { userData, check } = await userAuth();
    const { quesResp, quesData } = await fetchQuestion();
    console.log(quesResp);
    if (check.status === 200 && userData.message.isVerified) {
      setQuestion(quesData.message);
      navigate("/user/testPage");
    } else {
      navigate("/user/login");
    }
  }

  // send answe to server
  const sendAnswer = async (ans) => {
    const { resp, data } = await sendAnswerToServer(ans);
    if (resp.status === 200) {
      console.log("answer sent to server");
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  // change question - next
  const nextQuestion = async () => {
    if (question.length >= ind) {
      let check = await sendAnswer(JSON.parse(localStorage.getItem("quiz")));
      if (check) {
        setInd(ind + 1);
        localStorage.removeItem("quiz");
      } else {
        return;
      }
    } else {
      return;
    }
  };

  // submit test
  const submitTestBtn = async () => {
    try {
      // code
      const { resp, data } = await submitTest();
      if (resp.status === 200) {
        setIsCompleted(data.data.isCompleted);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("error submitting " + error.message);
    }
  };

  const checkTestCompleted = async () => {
    try {
      // code
      const { resp, data } = await getUserResult();
      if (resp.status === 200) {
        setData1(data.data.result);
        setCorrect(data.correct);
        setIsCompleted(data.data.isCompleted);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("error submitting " + error.message);
    }
  };

  // chart

  const data = {
    labels: data1.map((d, index) => index + 1),
    datasets: [
      {
        label: "Test Result",
        data: data1.map((d) => d.answer),
        backgroundColor: "rgba(0, 244, 0, 1)",
      },
    ],
  };

  useEffect(() => {
    auth();
    checkTestCompleted();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setQ(question[ind]);
    // eslint-disable-next-line
  }, [ind]);

  return (
    <>
      <ul className="nav mt-4 nav-tabs nav-fill mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="ex2-tab-1"
            data-mdb-toggle="tab"
            href="#ex2-tabs-1"
            role="tab"
            aria-controls="ex2-tabs-1"
            aria-selected="true"
          >
            Question {question.length}
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="ex2-tab-2"
            data-mdb-toggle="tab"
            href="#ex2-tabs-2"
            role="tab"
            aria-controls="ex2-tabs-2"
            aria-selected="false"
          >
            Results
          </a>
        </li>
      </ul>

      <div className="tab-content" id="ex2-content">
        <div
          className="tab-pane p-3 fade show active"
          id="ex2-tabs-1"
          role="tabpanel"
          aria-labelledby="ex2-tab-1"
        >
          {isCompleted ? (
            <h1>You have given test already</h1>
          ) : (
            <div>
              {q !== undefined &&
              q.length !== 0 &&
              ind <= question.length - 1 ? (
                <TestCard quiz={q} que={ind + 1} key={ind + 1} />
              ) : question.length !== 0 && ind <= question.length - 1 ? (
                <TestCard quiz={question[0]} que={ind + 1} key={ind + 1} />
              ) : (
                ""
              )}

              <div className="box d-flex justify-content-between">
                {ind >= question.length ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => submitTestBtn()}
                  >
                    submit
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="btn btn-primary"
                  disabled={ind >= question.length ? true : false}
                  onClick={() => nextQuestion()}
                >
                  next
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className="tab-pane p-3 fade"
          id="ex2-tabs-2"
          role="tabpanel"
          aria-labelledby="ex2-tab-2"
        >
          <div className="result">
            <h2>
              Your score:{" "}
              {data1.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.answer;
              }, 0)}
            </h2>
          </div>

          <div className="resultBox">
            {isCompleted ? (
              <div
                className="answerResult"
                style={{
                  marginTop: "2em",
                  border: "2px solid blue",
                  padding: "2em 2em",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="scoreTitle " style={{ flex: 1 }}>
                  <h5 style={{ fontWeight: "bold", marginTop: "1em" }}>
                    {" "}
                    correct answer :{correct}
                  </h5>
                  <h5 style={{ fontWeight: "bold", marginTop: "1em" }}>
                    incorrect answer :{data1.length - correct}
                  </h5>
                  <h5 style={{ fontWeight: "bold", marginTop: "1em" }}>
                    attempted question :{data1.length}
                  </h5>
                </div>

                <div style={{ flex: 1 }}>
                  <Bar options={options} data={data} />
                </div>
              </div>
            ) : (
              <h1>You have not submiited test</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TestPage;
