import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
import QuestionItem from '../components/questionItem';
// eslint-disable-next-line no-unused-vars
import { Button, InputGroup, Jumbotron, Table } from 'react-bootstrap';

function Editquiz () {
  const history = useHistory();
  const quizId = localStorage.getItem('quizId');
  const [quizInfos, setQuizInfos] = React.useState(JSON.parse(localStorage.getItem('quizInfos')));
  const [questionList, setQuestionList] = React.useState([{}]);
  console.log(questionList);
  const quizName = quizInfos.name;
  const backToDash = () => {
    history.push('/dashboard');
  };

  useEffect(() => {
    getQuiz();
  }, [questionList.length]);

  async function updateQuestion (queslist) {
    // eslint-disable-next-line array-callback-return
    const createBody = {
      questions: queslist,
      name: quizName,
      thumbnail: ''
    };
    console.log(queslist);
    getServerDatas(`/admin/quiz/${quizId}`, 'PUT', createBody);
    alert('question update successful');
  }

  async function getQuiz () {
    const quizInfo = await getServerDatas(`/admin/quiz/${quizId}`, 'GET');
    console.log(quizInfo);
    setQuestionList(quizInfo.questions);
    setQuizInfos(quizInfo);
    localStorage.setItem('quizInfos', `${JSON.stringify(quizInfo)}`);
  }

  function toQuesCreate () {
    history.push('/dashboard/quiz/questions/new');
  }

  function deleteQuestion (quesId) {
    const quesIdx = questionList.findIndex((e) => e.id === quesId);
    const newQuestionList = [...questionList];
    newQuestionList.splice(quesIdx, 1);
    console.log(newQuestionList);
    updateQuestion(newQuestionList);
    location.reload();
  }
  return (
      <>
      <Jumbotron className='mt-4'>
        <h2>Welcome to Quiz Editor!</h2>
        <div>
          <h3>Quiz ID:   {quizId} </h3>
          <h3>Quiz Name: {quizName} </h3>
        </div>
        <br />
        <br />
          <Button
              className='mr-2 mb-1'
              variant='info'
              onClick={toQuesCreate}
          >
            CreateQuestion
          </Button>
          <Button
              className='mr-2 mb-1'
              variant='secondary'
              onClick={backToDash}
          >
            backDashboard
          </Button>
      </Jumbotron>
        <Table responsive>
          <thead>
          <tr>
            <th className='text-center'>#</th>
            <th className='text-center'>Question</th>
            <th className='text-center'>Type</th>
            <th className='text-center'>Time</th>
            <th className='text-center'>Score</th>
            <th className='text-center'>Actions</th>
          </tr>
          </thead>
          <tbody>
          {questionList.map((ques, idx) => {
            return (
                <QuestionItem
                    key={idx}
                    idx={idx}
                    quesList={ques}
                    deleteQues={deleteQuestion}
                />
            )
          })}
          </tbody>
        </Table>

        </>
  )
}

export default Editquiz;
