import React from 'react';
import Web3 from 'web3';

class Web3console extends React.Component {
    constructor() {
        super();
        this.state = {
            accounts: '',
            privateKey: '',
            showProviateKey: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleShowPrivateKey = this.handleShowPrivateKey.bind(this);
    }

    componentWillMount() {
        console.log(web3)
        var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        var newAddress = web3.eth.accounts.create(web3.utils.randomHex(32));
        this.setState({ accounts: newAddress.address, privateKey: newAddress.privateKey });
        console.log(newAddress)
    }

    handleClick() {
        var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        var newAddress = web3.eth.accounts.create(web3.utils.randomHex(32));
        this.setState({ accounts: newAddress.address, privateKey: newAddress.privateKey });
    }

    handleShowPrivateKey() {
        this.setState({ showProviateKey: !this.state.showProviateKey });
    }

    render() {
        var { accounts, privateKey, showProviateKey } = this.state
        return (
            <div>
                <button onClick={this.handleClick}>
                    Create a new account
      i         </button>
                <h1>Address:</h1><p />
                <h2>{accounts}</h2>
                <button onClick={this.handleShowPrivateKey}>
                    Show private key, or not
      i         </button>
                <h1>Private Key:</h1><p />
                <h3>{showProviateKey ? privateKey : 'not to show'}</h3>
            </div>
        );
    }
}

export default Web3console;