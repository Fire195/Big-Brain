import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
function QuestionItem ({ quesList, deleteQues }) {
  // const { deleteQ } = deleteQues;
  const history = useHistory();
  const [queslist, setQueslist] = React.useState({});
  const quizId = localStorage.getItem('quizId');
  const quesId = queslist.idOfQues;
  useEffect(() => {
    setQueslist(quesList);
    console.log(queslist);
  });
  const toQuesEdit = (quesid) => {
    // localStorage.setItem('quesInfo', `${JSON.stringify(queslist)}`);
    localStorage.setItem('quesId', `${quesid}`);
    // console.log(JSON.parse(localStorage.getItem('quesInfo')));
    history.push(`/dashboard/quiz/${quizId}/question/${quesId}/edit`);
  };
  function deleteQ (quesid) {
    deleteQues(quesid);
  }
  return (
    <tr
        key={quesId}
    >
      <td className='text-center'>{quesId}</td>
      <td className='text-center'>{queslist.ques}</td>
      <td className='text-center'>{queslist.type}</td>
      <td className='text-center'>{queslist.time}</td>
      <td className='text-center'>{queslist.score}</td>
      <td className='text-center'>
        <Button
            className='mr-2 mb-1'
            variant="warning"
            onClick={() => toQuesEdit(quesId) }>
          Edit
        </Button>
        <Button
            className='mr-2 mb-1'
            variant="danger"
            onClick={() => deleteQ(queslist.ididOfQues)}>
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default QuestionItem;

QuestionItem.prototype = {
  // idx: PropTypes.number,
  quesList: PropTypes.array,
  deleteQues: PropTypes.function
};
