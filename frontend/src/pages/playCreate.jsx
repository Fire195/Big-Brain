import React, { useState, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import getServerDatas from '../components/fetchFunc';
import { useSnackbar } from 'notistack';
import { Button, Form } from 'react-bootstrap';

function PlayCreate () {
  const history = useHistory();
  const { sessionId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [playerName, setPlayerName] = useState('');
  const [sessID, setSessID] = useState('');
  console.log(playerName);
  function createPlayer () {
    const newplayerlist = JSON.parse(localStorage.getItem('playerNames'));
    newplayerlist.push(playerName);
    localStorage.setItem('playerNames', JSON.stringify(newplayerlist));
  }
  async function joinGame () {
    const data = await getServerDatas(`/play/join/${sessID}`, 'POST', {
      name: playerName
    });
    if (data >= 400) {
      history.push('/play/join');
      return enqueueSnackbar('Invalid Session', {
        variant: 'error',
      })
    }
    console.log(data);
    createPlayer(playerName);
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('currentSessionId', sessID);
    // TODO: waiting lobby
    history.push(`/play/${sessID}/player/${data.playerId}`);
  }
  useEffect(() => {
    setSessID(sessionId)
  }, []);
  // console.log(playerId);
  return (
    <Container>
      <Form>
        <Box className='m-5'>
          <div>
            <h2 className='h3 my-5'>
              Please enter your name and enjoy your game!
            </h2>
          </div>
        </Box>
        <Form.Group className='m-5'>
          <Form.Label>SessionId:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Session id'
            value={sessID || ''}
            onChange={(e) => setSessID(e.target.value)}
          />
          <Form.Label>Player name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Player name'
            value={playerName || ''}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <Button
            className='mt-3 px-4'
            variant='primary'
            onClick={joinGame}
          >
            Start
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default PlayCreate;
