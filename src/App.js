import React, { Component } from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const contractAbi = [{
  constant: false, inputs: [{ name: 'text', type: 'string' }, { name: 'topic', type: 'bytes32' }], name: 'sendMessage', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'text', type: 'string' }, { indexed: true, name: 'sender', type: 'address' }, { indexed: true, name: 'topic', type: 'bytes32' }], name: 'Message', type: 'event',
}];
const contractAddress = '0x31d1692cda4fb9eb2ba3b137e8af35ec2140eb1d';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
    };
  }

  componentDidMount() {
    const contract = web3.eth.contract(contractAbi).at(contractAddress);
    const logs = contract.Message({}, { fromBlock: 0, toBlock: 'latest' })
      .get((err, result) => {
        if (!err) {
          const logs = result && result.map(record => _.get(record, 'args.text'));
          console.log(result);
          this.setState({
            logs,
          });
        }
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.state.logs }
        </p>
      </div>
    );
  }
}

export default App;
