import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Editquiz from './pages/quizEdit';
import QuestionEdit from './pages/questionEdit';
import QuestionCreate from './pages/questionCreate';
import PlayCreate from './pages/playCreate';
import GamePage from './pages/gamePage';
import PlayResult from './pages/playResult';
import SessionResult from './pages/sessionResult';
import NotFound from './pages/NotFound';
import { SnackbarProvider } from 'notistack';
import AuthGuardRoute from './components/AuthGuardRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link
} from 'react-router-dom';

function App () {
  return (
    <>
      <SnackbarProvider
        dense
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Router>
          <Switch>
            <Route exact path='/404' component={NotFound} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Redirect exact from="/" to="/dashboard" />
            <AuthGuardRoute exact path='/dashboard' component={Dashboard} />
            <AuthGuardRoute
              exact
              path='/dashboard/quiz/:id'
              component={Editquiz}
            />
            {/* <AuthGuardRoute
              exact
              path='/dashboard/quiz/:id/new'
              component={Editquiz}
            />
            <AuthGuardRoute
              exact
              path='/dashboard/quiz/:id/edit'
              component={Editquiz}
            /> */}
            {/* <AuthGuardRoute
              exact
              path='/dashboard/quiz/:id/question/:ques_id'
              component={QuestionEdit}
            /> */}
            <AuthGuardRoute
              exact
              path='/dashboard/quiz/:id/question/:ques_id/edit'
              component={QuestionEdit}
            />
            <AuthGuardRoute
              exact
              path='/dashboard/quiz/questions/new'
              component={QuestionCreate}
            />
            <AuthGuardRoute
              exact
              path='/dashboard/session/:sessionId/results'
              component={SessionResult}
            />
            <Route
              path='/play/join/:sessionId'
              component={PlayCreate}
            />
            <Route
              exact
              path='/play/join'
              component={PlayCreate}
            />
            <Route
              exact
              path='/play/:sessionId/player/:playerId/'
              component={GamePage}
            />
            <Route
              exact
              path='/play/player/:playerId/results'
              component={PlayResult}
            />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;

// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   // Link
// } from 'react-router-dom';
//
// export default function App () {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }
//
// function Home () {
//   const [textareaError, setTextareaError] = React.useState(false);
//   const [textareaText, setTextareaText] = React.useState('abc');
//
//   const sendEmail = () => {
//     console.log(`Sending Email ${textareaText} to ${emailInputs.join(' , ')}.`);
//   };
//
//   const [emailInputs, SetEmailInputs] = React.useState(['', '']);
//
//   const updateEmail = (index, value) => {
//     const newEmailInputs = [...emailInputs];
//     newEmailInputs[index] = value;
//     SetEmailInputs(newEmailInputs);
//   };
//   // console.log(emailInputs);
//
//   const addPows = () => {
//     const newEmailInputs = [...emailInputs];
//     newEmailInputs.push('');
//     // newEmailInputs[index].push('');
//     SetEmailInputs(newEmailInputs);
//   };
//
//   return <>
//     <h2>Please invite your friends into CSE!</h2>
//     <textarea
//       style={textareaError ? { background: 'red' } : {}}
//       onBlur={() => setTextareaError(textareaText === '')}
//       onChange={(e) => setTextareaText(e.target.value)}
//     >
//       {textareaText}
//     </textarea>
//     <div>
//       {emailInputs.map((val, idx) => {
//         return (
//           <EmailInput
//             key={idx}
//             index={idx}
//             setEmail={updateEmail}
//             emailValue={emailInputs}
//           />
//         )
//       })}
//     </div>
//     <button onClick={addPows}>Add</button>
//     <button onClick={sendEmail} >Send</button>
//   </>;
// }
//
// function EmailInput ({ index, setEmail, emailValue }) {
//   return (
//     <div>
//       Email {index + 1}:
//       <input
//         type='text'
//         onChange={e => setEmail(index, e.target.value)}
//         value={emailValue[index]}
//       />
//     </div>
//   );
// }
//
// EmailInput.propTypes = {
//   index: PropTypes.number,
//   setEmail: PropTypes.function,
//   emailValue: PropTypes.function,
// };
