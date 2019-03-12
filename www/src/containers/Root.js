import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import styled from 'styled-components'
import {Version} from "../labellab-components"
import Home from '../containers/Home'
import ImageGeo from '../containers/ImageGeo'
import ImagePolygon from '../containers/ImagePolygon'
import ImageBox from '../containers/ImageBox'
import ImageClassification from '../containers/ImageClassification'
// import 'bootstrap/dist/css/bootstrap.css'

        // <Route path="/" component={Home} />

const contents = [
  {
    type: "image",
    items: [
      {
        type: "classification",
        geometry: [
          "none",
          "box",
          "polygon",
          "geoJson"
        ]
      }
    ]
  }
]
const blue = "#007bff"
const SideNav = styled.div`
  border-right: 1px solid lightgrey;
  height: 100%;
  padding-top: 15px;

  @media (max-width: 986px) {
    display: none;
  }
`
const MainContent = styled.div`
  padding-top: 15px;
  flex: 1;

  @media (max-width: 986px) {
    margin-left: 0;
    padding: 0;
  }
`
const Nav = () => {
  return <nav className="navbar navbar-dark" style={{backgroundColor: blue}}>
    <a  className="navbar-brand" href="/">
      <img
        alt="labellab-logo"
        style={{width: "40px", height: "40px"}}
        src="https://d1d09e79yja1m6.cloudfront.net/annotation-web/build/static/media/logo-over-dark.72869e75.png"/>
      <span style={{marginLeft: "10px", verticalAlign: "middle"}}>
        Labellab Developer Components
      </span>
    </a>
    <div style={{color: "white"}}>Version {Version}</div>
  </nav>
}
const LeftNav = () => {
  return <div style={{paddingRight: 0, width: "300px"}}>
    <SideNav>
      <h4>Components</h4>
      {
        contents.map((content, idx) => {
          return <div key={idx} style={{ textTransform: 'capitalize'}}>
            <a className="btn btn-link text-muted" href={`#${content.type}`}>
              File: { content.type }
            </a>
            <div style={{paddingLeft: "15px"}}>
              {
                content.items.map((comp, i) => {
                  return <div key={i}>
                    <a className="btn btn-link text-muted" href={`#${content.type}-${comp.type}`}>
                      Label: { comp.type }
                    </a>
                    <div style={{paddingLeft: "15px"}}>
                      {
                        comp.geometry.map((geometry, ii)=> {
                          return <div key={ii}>
                            <Link className="btn btn-link text-muted" to={`/${content.type}/${comp.type}/${geometry}`} >
                              Geometry: { geometry }
                            </Link>
                          </div>
                        })
                      }
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        })
      }
    </SideNav>
  </div>
}
const NotFound = () => {
  return <div>
    <h1 className="text-center" style={{marginTop: "30px"}}>404: Page not found</h1>
  </div>
}
const Root = ({ store }) => (
  <div className="labellab-docs" >
    <Provider store={store}>
        <Router>
        <div>
          <Nav/>
          <div style={{display: "flex", flexDirection: "row", paddingLeft: "15px", borderLeft: "1px solid lightgrey", borderRight: "1px solid lightgrey"}}>
            <LeftNav/>
            <MainContent className="container-fluid">
              <Switch>
                <Route exact path="/image/classification" component={ImageClassification} />
                <Route exact path="/image/classification/none" component={ImageClassification} />
                <Route exact path="/image/classification/box" component={ImageBox} />
                <Route exact path="/image/classification/polygon" component={ImagePolygon} />
                <Route exact path="/image/classification/geoJson" component={ImageGeo} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </MainContent>
        </div>
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
