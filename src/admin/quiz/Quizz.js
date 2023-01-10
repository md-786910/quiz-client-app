import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { createLink, createQuestion, fetchQuestion } from "../actions/api";
import QuizCard from "./QuizCard";
import { adminAuth } from "../actions/register_login";

function Quizz() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [quizData, setQuizData] = useState([]);
  const [url, setUrl] = useState("");
  const [ques, setQues] = useState({
    title: "",
  });
  const [loader, setLoader] = useState(true);

  const [option, setOption] = useState({
    op1: "",
    op2: "",
    op3: "",
    op4: "",
  });
  const [answer, setAnswer] = useState({
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  });

  const [prob, setProb] = useState({
    title: "",
    level: "",
    option: [],
    answer: [],
  });

  const handleChangeLevel = (e) => {
    const lev = parseInt(e.target.value);
    setLevel(lev);
    setProb({ ...prob, level: lev });
  };
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setQues({ ...ques, title: title });
    setProb({ ...prob, title: title });
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setOption({ ...option, [name]: value });
    setProb({ ...prob, option: { ...option, [name]: value } });
  };

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setAnswer({ ...answer, [name]: value });
    setProb({ ...prob, answer: { ...answer, [name]: value } });
  };

  // create question
  const handleSubmit = async (e) => {
    // set questiont to database
    try {
      const { op1, op2, op3, op4 } = prob.option;
      const { ans1 } = prob.answer;
      const { title } = prob;
      // console.log(op1, op2, op3, op4, title, ans1);
      if (!title || !op1 || !op2 || !op3 || !op4 || !ans1) {
        alert("please create question perfectly");
      } else {
        createQuestion(prob);
        // window.location.reload();
        getQues();
      }
    } catch (error) {
      console.log("question create error" + error.message);
    }
  };

  // get question
  async function getQues() {
    const { resp, data } = await fetchQuestion();
    if (resp.status === 200) {
      setLoader(false);
      setQuizData(data.data);
    } else {
      alert("something error occured!");
    }
  }
  // check auth admin
  async function auth() {
    const { adminData, check } = await adminAuth();
    if (check.status === 200 && adminData.message.isVerified) {
      navigate("/admin/create");
    } else {
      navigate("/admin/login");
    }
  }

  // create question link

  const createTestLink = async () => {
    const { data, resp } = await createLink();
    if (resp.status === 200) {
      setUrl(data.link);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    getQues();
    auth();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container1  h-100">
          <div className="row  mt-1 h-100">
            <div className="col-12 col-lg-6 col-xl-6">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Create question - {quizData.length}
                  </h3>
                  <div>
                    <div className="row">
                      <div className=" mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                            name="title"
                            onChange={handleTitleChange}
                            value={ques.title}
                          />
                          <label className="form-label" for="firstName">
                            Title
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="op1"
                            value={option.op1}
                            onChange={handleOptionChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            option 1
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="op2"
                            value={option.op2}
                            onChange={handleOptionChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            option 2
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="op3"
                            value={option.op3}
                            onChange={handleOptionChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            option 3
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="op4"
                            value={option.op4}
                            onChange={handleOptionChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            option 4
                          </label>
                        </div>
                      </div>
                    </div>

                    <p>Answer : </p>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="ans1"
                            value={answer.ans1}
                            onChange={handleAnswerChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            answer 1
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="ans2"
                            value={answer.ans2}
                            onChange={handleAnswerChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            answer 2
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="ans3"
                            value={answer.ans3}
                            onChange={handleAnswerChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            answer 3
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="ans4"
                            value={answer.ans4}
                            onChange={handleAnswerChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            answer 4
                          </label>
                        </div>
                      </div>
                    </div>

                    <p>difficulty level</p>

                    <div className="range">
                      <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        step={1}
                        value={level}
                        title={level}
                        onChange={handleChangeLevel}
                      />
                    </div>

                    <div className="mt-4 pt-2">
                      <button
                        className="btn btn-success btn-lg"
                        onClick={() => handleSubmit()}
                      >
                        Add Question
                      </button>
                      <button
                        type="button"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        className="btn mx-3 btn-primary btn-lg"
                        onClick={() => createTestLink()}
                      >
                        Create test link
                      </button>

                      {/* Model */}

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Your Test Link
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <input
                                style={{ width: "100%" }}
                                readOnly
                                type="text"
                                value={url}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-mdb-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Model End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6"
              style={{
                height: "100vh",
                overflow: "auto",
              }}
            >
              {quizData.length !== 0 ? (
                quizData &&
                quizData.map((quiz, index) => {
                  return <QuizCard key={index} que={index + 1} quiz={quiz} />;
                })
              ) : (
                <h3>You have not create any question yet!</h3>
              )}
            </div>
          </div>
        </div>
        <Loader loader={loader} />
      </section>
    </>
  );
}

export default Quizz;
