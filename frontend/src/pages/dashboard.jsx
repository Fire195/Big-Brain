import React, { useEffect, useState } from 'react';
// import Logout from './logout';
import { useHistory } from 'react-router-dom';
// import quizList from '../components/getQuizzes';
import getServerDatas from '../components/fetchFunc';
import QuizItem from '../components/quizItem';
import { useSnackbar } from 'notistack';
import { Jumbotron, Button, InputGroup, Table, Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// eslint-disable-next-line react/display-name
const Dashboard = () => {
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quizName, setQuizName] = useState('');
  const [quizList, setquizList] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState('start');
  const [modalSession, setModalSession] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleViewResult = () => {
    handleClose();
    console.log(modalSession)
    history.push(`/dashboard/session/${modalSession}/results`)
  }

  const getqQuizList = async () => {
    const data = await getServerDatas('/admin/quiz', 'GET', null);
    const quizArr = data.quizzes;
    // console.log(quizList);
    setquizList(quizArr);
    return quizArr;
  };

  useEffect(() => {
    getqQuizList();
  }, [quizName]);

  const createNewQuiz = async () => {
    for (let i = 0; i < quizList.length; i += 1) {
      if (quizList[i].name === quizName) {
        alert('This name has exist, please create a new name!');
        return;
      }
    }
    // eslint-disable-next-line array-callback-return
    const createBody = {
      name: quizName,
    };
    const response = getServerDatas('/admin/quiz/new', 'POST', createBody);
    console.log(response);
    location.reload();
  };

  const handleOpenModal = (type, session) => {
    handleShow();
    setModalType(type);
    console.log(modalSession)
    setModalSession(session);
  }

  // const copyAndJump = (session) => {
  //   window.open(`localhost:3000/play/join/${session}`);
  // }

  return (
    <>
      <Jumbotron className='mt-4'>
        <h2>Welcome to dashboard!</h2>
        <div>
          <InputGroup className='mt-4'>
            <input
              type='text'
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Quiz's name"
            />
            <InputGroup.Append>
              <Button variant='outline-primary' onClick={createNewQuiz}>
                Create Quiz
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Jumbotron>
      <br />
      <div>
        <h3>Quizes list:</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Questions</th>
              <th>Thumbnail</th>
              <th>Total Time(s)</th>
              <th>Active</th>
              <th>Created at</th>
              <th className='text-center'>Play</th>
              <th className='text-center'>Result</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizList.map((quiz, idx) => {
              return <QuizItem idx={idx} key={quiz.id} quiz={quiz} handleOpenModal={handleOpenModal}/>;
            })}
          </tbody>
        </Table>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Play</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === 'start' ? `Game started, session: ${modalSession}` : 'Game finished, would you like to view the results?'}
            </Modal.Body>
            {modalType === 'end'
              ? <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleViewResult}>
                    Yes
                  </Button>
                </Modal.Footer>
              : <Modal.Footer>
                  <CopyToClipboard
                      text={`${window.location.hostname + (window.location.port ? ':' + window.location.port : '')}/play/join/${modalSession}`}
                      onCopy={() => enqueueSnackbar('Quiz address copied!', { variant: 'success' })}
                  >
                    <Button style={{ cursor: 'copy' }} variant="primary">
                      Copy
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          className="bi bi-clipboard" viewBox="0 0 16 16">
                        <path
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path
                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                      </svg>
                    </Button>
                  </CopyToClipboard>
                </Modal.Footer>
            }
          </Modal>
        </>
      </div>
    </>
  );
};
export default Dashboard;
