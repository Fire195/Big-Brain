import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className='text-center p-5'>
      <h1 className='display-6'>404: Not Found</h1>
      <Button onClick={() => history.push('/dashboard')}>
        Back to Homepage
      </Button>
    </div>
  );
};

export default NotFound;
