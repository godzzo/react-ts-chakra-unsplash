import React, { Component } from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Hello from './Hello';
import './style.css';
import Unslpash from './Unsplash';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <span>
        <Unslpash />
      </span>
    );
  }
}

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
