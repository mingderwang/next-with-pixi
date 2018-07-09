import React from 'react';
import Web3 from 'web3';

class Web3console extends React.Component {
    constructor() {
        super();
        this.state = {
          accounts: '',
          privateKey: ''
        }
      }

    componentWillMount() {
        console.log(web3)
        var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        var newAddress = web3.eth.accounts.create(web3.utils.randomHex(32));
        this.setState({ accounts: newAddress.address, privateKey: newAddress.privateKey});
        console.log(newAddress)
    }

    render() {
        var { accounts, privateKey } = this.state
        return (
            <div>
            <h1>{accounts}</h1>
            <h1>{privateKey}</h1>
            </div>
        );
    }
}

export default Web3console;