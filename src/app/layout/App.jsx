import { Route } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import Navbar from "../../features/nav/NavBar";
import EventDashboard from '../../features/events/eventDashboard/EventDashboad';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage'
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';

function App() {
  const { key } = useLocation()

  return (
    <>
      <ModalManager />
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Navbar />
          <Container className="main">
            <Route exact path='/sandbox' component={Sandbox} />
            <Route exact path='/events' component={EventDashboard} />
            <Route path='/events/:id' component={EventDetailedPage} />
            <Route path={['/create-event', '/manage/:id']} component={EventForm} key={key} />
            <Route path='/error' component={ErrorComponent} />
          </Container>
        </>
      )} />
    </>
  );
}

export default App;
