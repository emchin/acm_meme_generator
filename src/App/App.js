import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MemeGeneratorWrapper from './components/MemeGenerator/MemeGeneratorWrapper';
import MemeGallery from './components/MemeGallery/MemeGallery';
import NavBar from './components/NavBar';


/** Main app controller */
class App extends React.Component {

  render() {
    // gets the URL pathname 
    const pageName = String(window.location).split("/")[3];
    return (
      <Router>
        <div className="App">
        <NavBar page={pageName}/>
        <MemeGeneratorWrapper />
        <Route
          path="/gallery"
          render = {(routeProps) =>
            <MemeGallery {...routeProps} />
          } />
        </div>
      </Router>
    );
  }
}

export default App;
