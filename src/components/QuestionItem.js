import React from "react";

function QuestionItem({ question, onDeleteQuestion, onCorrectIndexChange }) {
  const { id, prompt, answers, correctIndex } = question;

  // fetch the data by id to the server upon clicking of the button to delete
  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then(() => {
        onDeleteQuestion(question.id);
      });
  };


  function handleCorrectIndexChange(event) {
    onCorrectIndexChange(question.id, parseInt(event.target.value));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectIndexChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
