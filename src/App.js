import React, { PureComponent } from 'react';
import { Provider } from 'rebass';
import { injectGlobal } from 'styled-components';
import Users from './containers/Users';

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Provider>
          <Users />
        </Provider>
      </div>
    );
  }
}

export default App;
