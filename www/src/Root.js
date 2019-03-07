import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './containers/Home'
import Geo from './containers/Geo'
// import 'bootstrap/dist/css/bootstrap.css'

        // <Route path="/" component={Home} />
const Root = ({ store }) => (
  <div className="labellab-docs" >
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/geo" component={Geo} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </Provider>
  </div>
)

// Root.propTypes = {
//   store: PropTypes.object.isRequired
// }

// export default Root
// import React, { Component } from 'react';
// import logo from './logo.svg';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default Root;
