import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button, Form } from 'react-bootstrap';

// eslint-disable-next-line react/display-name
export default () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const registerBody = {
    email,
    password,
    name,
  };
  const handleSubmitRegister = async () => {
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
    } else if (name === '') {
      // alert('Please input name!');
      enqueueSnackbar('Please input name!', {
        variant: 'error',
      });
    } else {
      const response = await fetch(
        'http://localhost:5005/admin/auth/register',
        {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(registerBody),
        }
      );
      console.log(response);
      // const tokenJson = await response.json();
      if (response.status === 200) {
        console.log('register successful!');
        enqueueSnackbar('Register successful!', {
          variant: 'success',
        });
        history.push('/');
        console.log(response.json);
      } else if (response.status === 400) {
        console.log(registerBody);
        // alert('Invalid input');
        enqueueSnackbar('Invalid input', {
          variant: 'success',
        });
      }
    }
  };

  const handleBackToLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/dashboard');
    }
  }, []);

  return (
    <DashboardLayout>
      <Form>
        <h2 className='h3 my-5'>Please input your email , password & name!</h2>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Button
          className='mr-3 px-4'
          variant='primary'
          onClick={handleSubmitRegister}
        >
          Register
        </Button>
        <Button variant='outline-secondary' onClick={handleBackToLogin}>
          Back to Login
        </Button>
      </Form>
    </DashboardLayout>
  );
};
