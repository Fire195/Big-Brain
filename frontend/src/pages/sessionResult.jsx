import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Button, Table, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
import { Chart, Interval, Tooltip } from 'bizcharts';
import _ from 'lodash';

const converData = (data) => {
  const questionCount = (data[0] && data[0].answers.length) || 0;
  const dataArray = Array.from(new Array(questionCount + 1))
  data.forEach((person) => {
    let correctCount = 0;
    person.answers.forEach((ans) => {
      if (ans.correct) {
        correctCount += 1;
      }
    })
    if (dataArray[correctCount] !== undefined) {
      dataArray[correctCount] += 1;
    } else {
      dataArray[correctCount] = 1;
    }
  })
  console.log(dataArray)
  if (_.isEmpty(dataArray)) {
    return []
  }
  const total = dataArray.reduce((accumulator, currentValue) => accumulator + (currentValue === undefined ? 0 : Number(currentValue)), 0)
  return dataArray.map((item, index) => {
    return { correct: index, percentage: total === 0 ? 1 : item === undefined ? 0 : (item / total) * 100 }
  })
}
function SessionResult () {
  const history = useHistory();
  const { sessionId } = useParams();
  const [results, setResults] = useState([]);

  function BackToDash () {
    history.push('/dashboard');
  }
  const getResults = async () => {
    const data = await getServerDatas(`/admin/session/${sessionId}/results`, 'GET');
    if (data >= 400) {
      return history.push('/dashboard');
    }
    console.log(data)
    setResults(data.results);
  }
  useEffect(() => {
    getResults()
  }, [])

  return (
    <div className='text-center'>
      <Card className='mt-4'>
        <Card.Title className='p-3'>Top score of quiz</Card.Title>
        <Box >
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {results.length !== 0 && results.map((result, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{result.name}</td>
                        <td>{result.answers.reduce((acc, val) => acc + (val.correct ? 1 : 0), 0) * 100}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        </Box>
      </Card>
        <Card className='mt-4'>
          <Card.Title className='p-3'>Top score of quiz</Card.Title>
        <Card.Body >
            <Chart height={200} autoFit data={converData(results)} interactions={['active-region']} padding="auto" scale={{ percentage: { min: 0, alias: 'Correct percentage per question', type: 'linear-strict' }, correct: { range: [0.1, 0.9] } }}>
                <Interval position="correct*percentage" />
                <Tooltip showCrosshairs />
            </Chart>
        </Card.Body>
      </Card>
      <Card className='my-4'>
        <Card.Title className='p-3'>Average response/answer time for each question</Card.Title>
        <Card.Body>
            No data
        </Card.Body>
      </Card>
      <Button className='my-4' onClick={BackToDash}>
        Back to Dashboard
      </Button>
    </div>
  );
}
export default SessionResult;
