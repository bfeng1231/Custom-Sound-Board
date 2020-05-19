import React from 'react';
import './css/App.css';
import Sounds from './components/Sounds';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <div className="themed-container">
          <Sounds />
        </div>
      </Container>
    </div>
  );
}

export default App;
