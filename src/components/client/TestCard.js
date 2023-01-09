import React, { useState, useEffect } from "react";

function TestCard({ quiz, que }) {
  const [ques, setQues] = useState({
    title: quiz.title,
    opt: [],
    ans: quiz.answer,
  });

  const handleOption = (e) => {
    if (e.target.checked === true) {
      const value = e.target.value;
      setQues({
        ...ques,
        opt: [...ques.opt, value],
        ans: quiz.answer,
        title: quiz.title,
      });
    } else {
      const value = e.target.value;

      setQues({
        ...ques,
        opt: [...ques.opt.filter((e) => e !== value)],
        ans: quiz.answer,
        title: quiz.title,
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("quiz", JSON.stringify(ques));
    // eslint-disable-next-line
  }, [ques]);
  return (
    <>
      <div className="mx-0 mb-3 mx-sm-auto" key={que}>
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
              {quiz.option &&
                quiz.option.map((opt, index) => {
                  return (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={opt}
                        onChange={handleOption}
                      />
                      <label className="form-check-label">{opt}</label>
                    </div>
                  );
                })}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestCard;
