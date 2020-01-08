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
    // if (!url) {
    //   url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=17d3405001351c2a599cd5875c1b5250&tags=' + str + '&per_page=300&page=1&format=json&nojsoncallback=1';
    // }
    var socket = io(url);
    socket.on('connect_error', function (err) {
      // notify user
    });
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