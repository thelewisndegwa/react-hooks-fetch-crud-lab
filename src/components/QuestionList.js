import React, { useState, useEffect } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  const handleDropdownChange = (id, value) => {
    fetch(`/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex: value })
    })
      .then(() => {
        const updatedQuestions = questions.map(question => {
          if (question.id === id) {
            return { ...question, correctIndex: value };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    fetch(`/questions/${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <h2>Questions</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/questions-060")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <QuestionList questions={questions} />
    </div>
  );
}

export default App;