import React from 'react';
import { useHistory } from 'react-router-dom';
// //
// // export const backToLogin = async () => {
// //   const history = useHistory();
// //   const response = await fetch('http://localhost:5005/admin/auth/logout', {
// //     headers: { 'Content-type': 'application/json' },
// //     method: 'POST',
// //     Authorization: `Bearer ${localStorage.getItem('token')}`,
// //   });
// //   if (response.status === 200) {
// //     console.log('logout successful!');
// //     alert('Logout Successful!');
// //     history.push('/');
// //   } else if (response.status === 403) {
// //     alert('Invalid input');
// //   }
// // };
//
function Logout () {
  const history = useHistory();
  const backToLogin = () => {
    alert('logout successful!');
    history.push('/');
    localStorage.removeItem('token');
  };
  return (
    <>
      <button onClick={backToLogin}>logout</button>
    </>
  );
}
export default Logout;
