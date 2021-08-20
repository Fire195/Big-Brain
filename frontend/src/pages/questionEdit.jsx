import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
// import getServerDatas from '../components/fetchFunc';
import { Card, Form, Button } from 'react-bootstrap';

export function QuestionEdit () {
  const history = useHistory();
  const [questionList, setQuestionList] = React.useState({});
  const quesId = localStorage.getItem('quesId');
  const [quesInfo, setQuesInfo] = React.useState({});
  const [ques, setQues] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [type, setType] = React.useState('');
  const [time, setTime] = React.useState('');
  const [score, setScore] = React.useState('');
  // const [questionList, setQuestionList] = React.useState([{}]);
  const quizId = localStorage.getItem('quizId');
  const quizName = localStorage.getItem('quizName');
  // const questionList = JSON.parse(localStorage.getItem('quizInfos')).questions;
  // console.log('ccc');
  // const quesBody = {
  //   idOfQues: quesInfo.idOfQues,
  //   type: quesInfo.type,
  //   time: quesInfo.time,
  //   score: quesInfo.score,
  //   ques: quesInfo.ques,
  //   options: quesInfo.options,
  //   answers: quesInfo.answers,
  // };

  useEffect(() => {
    // setQuesInfo(JSON.parse(localStorage.getItem('quesInfo')));
    getQuesList(quesId);
    console.log(quesInfo)
  }, [quesInfo.idOfQues]);
  async function updateQuestion (queslist) {
    // eslint-disable-next-line array-callback-return
    const createBody = {
      questions: queslist,
      name: quizName,
      thumbnail: ''
    };
    // console.log(queslist);
    getServerDatas(`/admin/quiz/${quizId}`, 'PUT', createBody);
    alert('question update successful');
  }
  async function getQuesList (quesId) {
    const quizInfo = await getServerDatas(`/admin/quiz/${quizId}`, 'GET');
    const quesl = quizInfo.questions;
    const quesIdx = quesl.findIndex((item) => item.idOfQues === Number(quesId));
    setQuestionList(quesl);
    setQuesInfo(quesl[quesIdx]);
    console.log(quesl[quesIdx]);
    localStorage.setItem('quizInfos', `${JSON.stringify(quizInfo)}`);
    const curQuesBody = quesl[quesIdx];
    setQues(curQuesBody.ques);
    setType(curQuesBody.type);
    setTime(curQuesBody.time);
    setScore(curQuesBody.score);
    setOptions(curQuesBody.options);
    setAnswers(curQuesBody.answers);
  }
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
  const deleteOptions = (index) => {
    if (options.length <= 2) {
      alert('At least 2 options!');
    } else {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };
  function updateQues (quesId) {
    const quesIdx = questionList.findIndex((e) => e.idOfQues === Number(quesId));
    console.log(quesIdx);
    const newQuesList = [...questionList];
    // eslint-disable-next-line camelcase
    newQuesList[quesIdx] = ({
      ...newQuesList[quesIdx],
      ques,
      options,
      answers,
      type,
      time,
      score
    });
    console.log(newQuesList[quesIdx]);
    updateQuestion(newQuesList);
    toQuiz();
  }
  const toQuiz = () => {
    history.push(`/dashboard/quiz/${quizId}`);
  };
  console.log(quesInfo);
  return (
    <>
      <Card className="mt-3">
        <Card.Body>
        <Card.Title>Edit your Question</Card.Title>
        <h2>Question ID:</h2>
        <h2>Question Name:</h2>
        <hr/>
        </Card.Body>
      </Card>
      <Form>
        <Form.Group>
          <Form.Label>Question text:</Form.Label>
          <Form.Control
            type='text'
            value={ques}
            // value={ques || ''}
            onChange={(e) => setQues(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
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
          {/* {options.map((opt, idx) => {
            return (
              <div key={idx}>
                Option {idx + 1}:
                <input
                  type="text"
                  onChange={(e) => updateValue('option', idx, e.target.value)}
                  value={opt}
                />
              </div>
            )
          })} */}
        </Form.Group>
        <Form.Group>
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
          >
            addAnswer
          </Button>
        </Form.Group>
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
        {/* <div>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div> */}
        <Form.Group>
          <Form.Label>Time:</Form.Label>
          <Form.Control
            type='text'
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </Form.Group>
        {/* <div>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div> */}
        <Form.Group>
            <Form.Label>Score:</Form.Label>
            <Form.Control
              type='text'
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </Form.Group>
        {/* <div>
          Score:
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div> */}
        <br/>
        <Button className='m-2' type="button" variant='primary' onClick={() => updateQues(quesId)}>Update Question</Button>
        <Button className='m-2' type="button" variant='outline-secondary' onClick={toQuiz} >backQuizEdit</Button>
      </Form>
    </>
  )
}

export default QuestionEdit;
