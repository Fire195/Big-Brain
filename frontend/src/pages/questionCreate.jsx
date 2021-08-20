import React from 'react';
import { useHistory } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
// import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';

export function QuestionCreate () {
  const history = useHistory();
  const [ques, setQues] = React.useState('');
  const [options, setOptions] = React.useState(['', '']);
  const [answers, setAnswers] = React.useState(['']);
  const [type, setType] = React.useState('single');
  const [time, setTime] = React.useState(0);
  const [score, setScore] = React.useState('');
  const questionList = JSON.parse(localStorage.getItem('quizInfos')).questions;
  const quizName = localStorage.getItem('quizName');
  const quizId = localStorage.getItem('quizId');
  // eslint-disable-next-line camelcase
  const question_body = {
    idOfQues: questionList.length + 1,
    type: type,
    time: time,
    score: score,
    ques: ques,
    options: options,
    answers: answers,
  };
  console.log(question_body);
  const updateValue = (type, index, value) => {
    if (type === 'option') {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    } else if (type === 'answer') {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    }
  };
  const deleteOptions = (index) => {
    if (options.length <= 2) {
      alert('At least 2 options!');
    } else {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };
  const addRows = (type) => {
    if (type === 'option') {
      if (options.length < 6) {
        const newOption = [...options];
        newOption.push('');
        setOptions(newOption);
      } else {
        alert('No more than 6 options!');
      }
    } else if (type === 'answer') {
      if (answers.length < options.length) {
        const newAnswer = [...answers];
        newAnswer.push('');
        setAnswers(newAnswer);
      } else {
        alert('The quantity of answers should not be more than that of options!');
      }
    }
  };
  async function createNewQuestion (queslist) {
    // eslint-disable-next-line array-callback-return
    const createBody = {
      questions: queslist,
      name: quizName,
      thumbnail: ''
    };
    getServerDatas(`/admin/quiz/${quizId}`, 'PUT', createBody);
    alert('question create successful');
    toQuiz();
  }
  const createQues = () => {
    const newQuesList = [...questionList];
    newQuesList.push(question_body);
    // console.log(newQuesList);
    createNewQuestion(newQuesList);
  };
  const toQuiz = () => {
    const quizId = localStorage.getItem('quizId');
    history.push(`/dashboard/quiz/${quizId}`);
  };
  return (
    <>
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Create a new question</Card.Title>
        <hr/>
        <Form>
          <Form.Group>
            <Form.Label>Question text:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter question text'
              value={ques || ''}
              onChange={(e) => setQues(e.target.value)}
            />
          </Form.Group>
            {options.map((opt, idx) => {
              return (
                <Form.Group key={idx}>
                  <Form.Label>Option {idx + 1}:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => updateValue('option', idx, e.target.value)}
                    value={opt}
                  />
                  <Button
                    variant='outline-danger'
                    onClick={(e) => deleteOptions('option', idx)}
                  >delete
                  </Button>
                </Form.Group>
              )
            })}
          <Button type="button" onClick={() => addRows('option')}>addOption</Button>
          <hr/>
          {answers.map((ans, idx) => {
            return (
              <Form.Group key={idx}>
                <Form.Label>Answer {idx + 1}:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => updateValue('answer', idx, e.target.value)}
                  value={ans}
                />
              </Form.Group>
            )
          })}
          <Button
            variant='primary'
            onClick={() => addRows('answer')}
          >addAnswer
          </Button>
          <hr/>
          <Form.Group key='inline-radio' className="mb-3">
            <Form.Label className="mr-3">Type:</Form.Label>
            <Form.Check
              inline
              value='single'
              label='single'
              type='radio'
              id='inline-radio-1'
              checked={type === 'single'}
              onChange={(e) => setType(e.currentTarget.value)}
              />
            <Form.Check
              inline
              value='multiple'
              label='multiple'
              type='radio'
              id='inline-radio-2'
              checked={type === 'multiple'}
              onChange={(e) => setType(e.currentTarget.value)}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter question timeLimite'
              value={time || ''}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Score:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter question score'
              value={score || ''}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
        <br/>
        <Button className='mr-2' type="button" variant='primary' onClick={createQues}>Create Question</Button>
        <Button type="button" variant='outline-secondary' onClick={toQuiz} >backQuizEdit</Button>
      </Card.Body>
    </Card>
    </>
  )
}
export default QuestionCreate;
