import { useState } from 'react';

function NewQuestionForm({ addQuestion }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = { prompt, answers, correctIndex };

    fetch('/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    })
      .then(response => response.json())
      .then(data => {
        // Add the new question to the QuestionList component state
        addQuestion(data);
      })
      .catch(error => console.error(error));
  };

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
      </label>

      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input type="text" value={answer} onChange={e => handleAnswerChange(e, index)} />
        </label>
      ))}

      <label>
        Correct answer:
        <select value={correctIndex} onChange={e => setCorrectIndex(e.target.value)}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>{answer}</option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}