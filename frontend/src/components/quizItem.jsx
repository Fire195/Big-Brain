import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import getServerDatas from '../components/fetchFunc';
import dayjs from 'dayjs';
import { Button, Badge } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const QuizItem = ({ idx, quiz, handleOpenModal }) => {
  const [quizInfos, setQuizInfos] = useState({});
  const [questionNum, setQuestionNum] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const location = useLocation();
  const quizId = quiz.id;

  const getQuiz = async () => {
    const quizInfo = await getServerDatas(`/admin/quiz/${quizId}`, 'GET');
    // console.log(quizInfo);
    setQuizInfos(quizInfo);
  }

  useEffect(() => {
    getQuiz();
  }, [quizId, quiz.quizInfo]);

  useEffect(() => {
  }, [quizInfos]);

  const toEditQuiz = (quizInfos) => {
    localStorage.setItem('quizId', `${quizId}`);
    localStorage.setItem('quizInfos', `${JSON.stringify(quizInfos)}`);
    // console.log(quizId);
    history.push(`/dashboard/quiz/${quizId}`);
  };

  async function toDeleteQuiz () {
    await getServerDatas(`/admin/quiz/${quizId}`, 'DELETE');
    enqueueSnackbar('Delete successful!', {
      variant: 'success'
    })
    getServerDatas(`/admin/quiz/${quizId}`, 'GET').then((res) => {
      setQuizInfos(res);
    });
    location.reload();
  }

  async function toStartQuiz () {
    await getServerDatas(`/admin/quiz/${quizId}/start`, 'POST');
    enqueueSnackbar('Quiz started!', {
      variant: 'success'
    })
    getServerDatas(`/admin/quiz/${quizId}`, 'GET').then((res) => {
      console.log(res);
      setQuizInfos(res);
      handleOpenModal('start', res.active)
    });
    // nextQuestion();
    // location.reload();
  }

  async function toEndQuiz () {
    await getServerDatas(`/admin/quiz/${quizId}/end`, 'POST');
    enqueueSnackbar('Quiz ended!', {
      variant: 'success'
    })
    getServerDatas(`/admin/quiz/${quizId}`, 'GET').then((res) => {
      // console.log(res)
      setQuizInfos(res);
      handleOpenModal('end', quizInfos.active)
    });
    // location.reload();
  }

  function getResult () {
    const sessionId = localStorage.getItem('currentSessionId');
    console.log(sessionId);
    history.push(`/admin/session/${sessionId}/results`);
  }

  async function nextQuestion () {
    const questionNum = await getServerDatas(`/admin/quiz/${quizId}/advance`, 'POST');
    setQuestionNum(questionNum.stage);
    console.log(questionNum.stage);
  }

  // console.log(quizInfos.questions.length);
  return (
    <>
      <tr key={quizId}>
        <td>{idx + 1}</td>
        <td>{quizInfos.name}</td>
        <td>{quizInfos.questions && quizInfos.questions.length}</td>
        <td>{quizInfos.thumbnail ? <img height='20px' src={`${quizInfos.thumbnail}`} alt='thumbnail'/> : 'Null'}</td>
        <td>{quizInfos.questions && quizInfos.questions.reduce((accumulator, currentValue) => accumulator + Number(currentValue.time), 0)}</td>
        <td>
          {quizInfos.active
            ? <>
              <Badge variant='success'>{quizInfos.active}</Badge>
              <div className='text-center'>
                {console.log(location)}
                <CopyToClipboard
                    text={`${window.location.hostname + (window.location.port ? ':' + window.location.port : '')}/play/join/${quizInfos.active}`}
                    onCopy={() => enqueueSnackbar('Quiz address copied!', { variant: 'success' })}
                >
                  <a style={{ cursor: 'copy' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-clipboard" viewBox="0 0 16 16">
                      <path
                          d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path
                          d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                  </a>
                </CopyToClipboard>
              </div>
              </>
            : <Badge variant='secondary'>Inactive</Badge>}
        </td>
        <td>{dayjs(quizInfos.created_at).format('DD/MM/YYYY')}</td>
        <td className='text-center'>
          {quizInfos.active
            ? <>
                <Button
                    className='mr-2'
                    variant='outline-warning'
                    onClick={toEndQuiz}
                >
                  End
                </Button>
                {/* questionNum < quizInfos.questions.length */}
                {/* questionNum !== undefined */}
                { true && <Button
                    className='mr-2 mt-1'
                    variant='outline-primary'
                    onClick={nextQuestion}
                >
                  Next({
                  Number(questionNum)
                })</Button>
                }
              </>
            : <Button
                className='mr-2'
                variant='outline-success'
                onClick={toStartQuiz}
            >
              Start
            </Button>}
        </td>
        <td>
          <Button
            className='mr-2'
            variant='outline-primary'
            onClick={getResult}
        >
          Result
        </Button></td>
        <td className='text-center'>
          <Button
            className='mr-2 mb-1'
            variant='outline-primary'
            onClick={() => toEditQuiz(quizInfos)}
          >
            Edit
          </Button>
          <Button
            className='mr-2 mb-1'
            variant='outline-danger'
            onClick={toDeleteQuiz}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

QuizItem.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.number,
  quiz: PropTypes.object,
  handleOpenModal: PropTypes.func
};

export default QuizItem;
