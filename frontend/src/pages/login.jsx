import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, Form } from 'react-bootstrap';
import DashboardLayout from '../layouts/DashboardLayout';

// import TextField from '@material-ui/core/TextField';
// eslint-disable-next-line react/display-name
export default () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = () => {
    history.push('/register');
  };

  const loginBody = {
    email,
    password,
  };

  const handleSubmitForm = async () => {
    // console.log('submit');
    if (email === '') {
      // alert('Please input email!');
      enqueueSnackbar('Please input email!', {
        variant: 'error',
      });
    } else if (password === '') {
      // alert('Please input password!');
      enqueueSnackbar('Please input password!', {
        variant: 'error',
      });
    } else {
      const response = await fetch('http://localhost:5005/admin/auth/login', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(loginBody),
      });
      // console.log(response);
      // const tokenJson = await response.json();
      if (response.status === 200) {
        console.log('login successful!');
        response.json().then((result) => {
          const token = result.token;
          // console.log(result);
          localStorage.setItem('token', token);
          history.push('/dashboard');
          enqueueSnackbar('Login successfully!', {
            variant: 'success',
          });
          // console.log(localStorage.getItem('token'));
        });
      } else if (response.status === 400) {
        console.log(response);
        // alert('Invalid input');
        enqueueSnackbar('Invalid input!', {
          variant: 'error',
        });
      }
    }
    localStorage.setItem('playerNames', JSON.stringify([]));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/dashboard')
    }
  }, []);

  return (
    <DashboardLayout>
      <Form>
        <h2 className='h3 my-5' >
          Please login with your email & password!
        </h2>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mr-3 px-4" variant='primary' onClick={handleSubmitForm}>
          Login
        </Button>
        <Button variant='outline-secondary' onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </DashboardLayout>
  );
};
