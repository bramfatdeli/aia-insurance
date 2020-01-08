import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      pictures: [],
    };
  }

  componentDidMount(str = 'programmer') {
    var url = 'http://localhost:5000?q=' + str;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        let picArray = j.map((pic) => {
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          return (
            <img key={srcPath} src={srcPath} width="142px" height="142px" />
          )
        })
        this.setState({ pictures: picArray });
      }.bind(this))
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.componentDidMount(e.target.value);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Test</h1>

          <input
            type="text"
            placeholder="Search an Enter"
            onKeyDown={this._handleKeyDown}
          />
        </header>
        <p className="App-intro">
          {this.state.pictures}
        </p>
      </div>
    );
  }
}
export default App;