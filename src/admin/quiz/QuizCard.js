import React from "react";
import { deleteQuestion } from "../actions/api";

function QuizCard({ quiz, que }) {
  const refreshPage = () => {
    let check = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (check) {
      window.location.reload();
    } else {
      return;
    }
  };

  const handleDelete = async (id) => {
    const { resp, data } = await deleteQuestion(id);
    if (resp.status === 200) {
      refreshPage();
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="mx-0 mb-3 mx-sm-auto">
        <div className="card">
          <div className="card-body">
            <div className="text-center">
              <p>
                <span
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                >
                  Q{que}.
                </span>
                <strong> {quiz.title}</strong>
              </p>
            </div>

            <hr />

            <form className="px-4">
              <div className="text-center">
                correct answer :{" "}
                {quiz.answer.map((a, index) => {
                  return <span key={index}>{a === "" ? "" : a + " "}</span>;
                })}
              </div>

              {quiz.option.map((e, index) => {
                return (
                  <div className="form-check mb-2" key={index}>
                    <input
                      className="form-check-input"
                      type={quiz.answer[1] !== "" ? "checkbox" : "radio"}
                      name="exampleForm"
                      id="radio2Example5"
                    />
                    <label className="form-check-label" for="radio2Example5">
                      {e}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
          <div className="card-footer text-end">
            <button
              type="button"
              className="btn btn-danger mx-3"
              onClick={() => handleDelete(quiz._id)}
            >
              DELETE
            </button>
            <button className="level">
              <b>Level : {quiz.level}</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizCard;
