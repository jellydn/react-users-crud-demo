import React, { Component } from "react";
import { Provider, Heading, Button } from "rebass";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider>
          <Heading>Simple Users CRUD</Heading>
          <Button>Rebass</Button>
        </Provider>
      </div>
    );
  }
}

export default App;
