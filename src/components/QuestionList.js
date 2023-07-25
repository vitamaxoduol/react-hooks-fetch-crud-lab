import React, {useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  //get all the questions by fetching from the API and display them
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions))
    }, []);


    function handleAddNewQuestion(newQuestion){
      setQuestions([...questions, newQuestion])
    }


    const handleDeleteQuestion = (id) => {
      setQuestions(questions.filter((question) => question.id !== id));
    };
    

    function handleCorrectIndexChange(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctIndex })
      })
        .then((response) => response.json())
        .then((updatedQuestion) => {
          // Find the index of the question with the given id
          const index = questions.findIndex((q) => q.id === id);
  
          // Make a new array of all the existing questions plus the new one
          const updatedQuestions = [
            ...questions.slice(0, index),
            updatedQuestion,
            ...questions.slice(index + 1)
          ];
  
          // Set the new questions array to state
          setQuestions(updatedQuestions);
        });
    }
    

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onAddNewQuestion={handleAddNewQuestion} />
      <ul>{/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
        <QuestionItem key={question.id} question={question} 
        onDeleteQuestion={handleDeleteQuestion} onCorrectIndexChange={handleCorrectIndexChange} /> 
        ))}
      </ul>

    </section>
  );
}

export default QuestionList;
