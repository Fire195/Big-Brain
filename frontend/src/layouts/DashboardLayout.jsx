import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const DashboardLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  const handleLogout = () => {
    history.push('/login');
    localStorage.removeItem('token');
  }

  const handleLogin = () => {
    history.push('/login');
  }

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>BigBrain</Navbar.Brand>
          {token
            ? <>
                <Nav className='mr-auto'>
                  <Nav.Link href='/dashboard'>Home</Nav.Link>
                  <Nav.Link href='/blanko'>Blanko</Nav.Link>
                  <Nav.Link href='/slido'>Slido</Nav.Link>
                  <Nav.Link href='/tetro'>Tetro</Nav.Link>
                </Nav>
                <Navbar.Text className="mr-3">Hello, Admin</Navbar.Text>
                <Button variant='outline-primary' onClick={handleLogout}>Logout</Button>
              </>
            : <Button variant='outline-primary' onClick={handleLogin}>Login</Button>
          }
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
