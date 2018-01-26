import Web3 from 'web3';

const web3Provider = 'http://localhost:8545';

export default new Web3(new Web3.providers.HttpProvider(web3Provider));
