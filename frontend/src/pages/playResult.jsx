import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Button } from 'react-bootstrap';

export function PlayResult () {
  const history = useHistory();

  function BackToDash () {
    history.push('/dashboard');
  }
  return (
    <>
      <Box>
        <span>
          PlayerName:
        </span>
        <span>
          PlayerID:
        </span>
      </Box>
      <Box >
        <Box >
          Question Result
        </Box>
        <Box >
          {/* {questionArray.map((q) => (
            <div key={q.id}>
              <span>
                Question:
                {q.id}
              </span>
              {(q.question === 'correct') ? (
                <span>
                  {q.question}
                </span>
              ) : (
                <span>
                  {q.question}
                </span>
              )}
            </div>
          ))} */}
        </Box>
      </Box>
      <Box >
        <span>
          Time:
        </span>
        <Box >
          {/* {questionTime.map((t) => (
            <div key={t.id}>
              <span>
                Question
                {t.id}
              </span>
              {t.spendtime}
            </div>
          ))} */}
        </Box>
      </Box>
      <Box>
        SCORE:
      </Box>
      <Button onClick={BackToDash}>
        Back to Dashboard
      </Button>
    </>
  );
}
export default PlayResult;
