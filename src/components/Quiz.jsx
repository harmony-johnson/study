import { useState, useEffect } from "react";
import questions from "../data/questions.json";
import { shuffleArray } from "../utils/shuffle";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    setShuffledOptions(shuffleArray(questions[current].options));
  }, [current]);

  const handleAnswer = (option) => {
  const question = questions[current];
  const correctAnswer = question.options[0];

  const isCorrect = option === correctAnswer;

  // Save result for review
  const newResult = {
    question: question.question,
    selected: option,
    correct: correctAnswer,
    isCorrect
  };

  setResults((prev) => [...prev, newResult]);

  if (isCorrect) {
    setScore((prev) => prev + 1);
  }

  const next = current + 1;

  if (next < questions.length) {
    setCurrent(next);
  } else {
    setShowReview(true);
  }
};

if (showReview) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Review Results</h2>
      <h3>Score: {score}/{questions.length}</h3>

      {results.map((r, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc"
          }}
        >
          <h4>
            {index + 1}. {r.question}
          </h4>

          {questions[index].options.map((opt, i) => {
            const isCorrect = opt === r.correct;
            const isSelected = opt === r.selected;

            return (
              <div
                key={i}
                style={{
                  padding: "5px",
                  margin: "5px 0",
                  backgroundColor: isCorrect
                    ? "lightgreen"
                    : isSelected
                    ? "#ffb3b3"
                    : "transparent",
                  fontWeight: isCorrect ? "bold" : "normal"
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      ))}

      <button
        onClick={() => {
          setCurrent(0);
          setScore(0);
          setResults([]);
          setShowReview(false);
        }}
        style={{ padding: "10px", marginTop: "20px" }}
      >
        Restart Quiz
      </button>
    </div>
  );
}

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Study Quiz App</h2>

      <p>
  Question {current + 1} of {questions.length}
</p>

      <h3>
        Question {current + 1}: {questions[current].question}
      </h3>

      <div>
        {shuffledOptions.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(opt)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        ))}
      </div>
        <div style={{ width: "100%", background: "#eee", height: "10px", borderRadius: "5px" }}>
  <div
    style={{
      width: `${((current + 1) / questions.length) * 100}%`,
      height: "10px",
      background: "green",
      borderRadius: "5px"
    }}
  />
</div>
      {/* <p>Score: {score}</p> */}
    </div>
  );
}