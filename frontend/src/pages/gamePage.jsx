import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
import { Card, Button, Form } from 'react-bootstrap';
import addTimer from '../components/countTime';
import { useSnackbar } from 'notistack';

function GamePage () {
  const playerName = localStorage.getItem('playerName');
  const { playerId } = useParams();
  // const history = useHistory();
  const [type, setTypy] = useState('');
  const [score, setScore] = useState(0);
  const [option, setOption] = useState([]);
  const [anwser, setAnswer] = useState([]);
  const [ques, setQues] = useState('');
  const [questionInf, setQuestionInf] = useState({ time: 0, idOfQues: 0 });
  const [status, setStatus] = useState('');
  const [quesId, setQuesId] = useState('');
  const [ansIds, setAnsIds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [result, setResult] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const { initialTime, startTimer } = addTimer(questionInf);

  async function getQuestion () {
    const questionData = await getServerDatas(`/play/${playerId}/question`, 'GET');
    if (questionData >= 400) {
      console.log(questionData.status)
      return console.log('color: #007acc;', `/play/join/${localStorage.getItem('currentSessionId')}`);
      // return history.push(`/play/join/${localStorage.getItem('currentSessionId')}`)
    }
    const questionInfo = await questionData.question;
    // console.log(questionData);
    setTypy(questionInfo && questionInfo.type);
    setScore(Number(questionInfo && questionInfo.score));
    setOption((questionInfo && questionInfo.options) || []);
    setAnswer((questionInfo && questionInfo.answers) || []);
    setQues(questionInfo && questionInfo.ques);
    setQuestionInf(questionInfo)
    setQuesId(questionInfo && questionInfo.idOfQues);
    console.log(questionInfo);
    return questionInfo;
  }
  async function getStatus () {
    const quizStatus = await getServerDatas(`/play/${playerId}/status`);
    if (quizStatus) {
      setStatus('started!');
    } else {
      setStatus('ended!');
    }
  }

  useEffect(() => {
    getQuestion();
    getStatus();
  }, [playerId]);

  useEffect(() => {
    setIsTimeUp(startTimer);
  }, [startTimer]);

  // function getResult () {
  //   history.push(`/play/player/${playerId}/results`);
  // }

  function storeAns (optId) {
    const ansl = [];
    setAnsIds(optId);
    ansl.push(optId);
    putAns(ansl);
  }
  async function putAns (answerIds) {
    await getServerDatas(
      `/play/${playerId}/answer`,
      'PUT',
      {
        answerIds
      }
    );
  }

  const handleNext = async () => {
    const currentQues = await getServerDatas(`/play/${playerId}/question`);
    if (currentQues >= 400) {
      enqueueSnackbar('Game finished', {
        variant: 'success'
      })
      const quizResult = await getServerDatas(`/play/${playerId}/results`);
      return setResult(quizResult);
    }
    if (currentQues && currentQues.question && currentQues.question.idOfQues === questionInf.idOfQues) {
      return enqueueSnackbar('Cannot move to next question until admin advances the question', {
        variant: 'error'
      })
    } else {
      getQuestion()
    }
  }
  return (
    <>
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Game Page</Card.Title>
        <Card.Text>
          playerId: {playerId}
          <br />
          Quiz status: {status}
          <br />
          PlayerName: {playerName}
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='mt-3'>
      <Card.Body>
        {result.length !== 0
          ? <>
            <Card.Title>
              Quiz result:
            </Card.Title>
            <Box>
              {result.map((res, index) =>
                <div key={index}>
                  {`${index + 1}: ${res.correct ? 'Correct' : 'Wrong'} ${res.answerIds.length === 0 && 'Not Answered'}`}
                </div>)
              }
            </Box>
            </>
          : <>
            <Card.Title>
              Question{quesId}:
              <br/>
              {ques}
            </Card.Title>
            <Card.Text>
              <Box>
                <p />Type: {type}  Score:{score} Time remain: {initialTime}
              </Box>
              <Form>
                <Form.Group >
                  {option.map((opt, idx) => {
                    return (
                      <Form.Check
                        disabled={isTimeUp}
                        key={idx}
                        type={'radio'}
                        label={`${opt}`}
                        checked={ansIds === idx}
                        onChange={() => storeAns(idx)}
                        // onClick={() => storeAns(idx + 1)}
                      >
                      </Form.Check>
                    )
                  })}
                </Form.Group>
                <Box>
                  <Form.Group>
                    {isTimeUp &&
                    <>
                    The Answer is
                    {anwser.map((ans, idx) => {
                      return (
                        <div
                          key={idx}
                        >
                          Anwser {idx + 1}: {ans}
                        </div>
                      )
                    })}
                    </>}
                  </Form.Group>
                  <Button className='mr-2' disabled={!isTimeUp} onClick={handleNext}>
                    Next
                  </Button>
                  {/* <Button onClick={getResult}>
                    GetResult
                  </Button> */}
                </Box>
              </Form>
            </Card.Text>
          </>
        }
      </Card.Body>
    </Card>
    </>
  );
}

export default GamePage;
