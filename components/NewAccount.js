import React from "react";
import Web3 from "web3";

function createContract(web3, account) {
  console.log(account);
  var Test = new web3.eth.Contract(
    [
      {
        constant: false,
        inputs: [],
        name: "myFunction",
        outputs: [
          {
            name: "myNumber",
            type: "uint256"
          },
          {
            name: "myString",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    "0x319a999cbe5e174f5356f11bca3cbbc6f1293114",
    {
      from: account,
      gasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
    }
  );
  console.log(Test);
  Test.methods.myFunction().call()
  .then(console.log);
}

class Web3console extends React.Component {
  web3 = null;
  codebase = "";

  constructor() {
    super();
    this.state = {
      accounts: "",
      privateKey: "",
      showProviateKey: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleShowPrivateKey = this.handleShowPrivateKey.bind(this);
  }

  componentWillMount() {
    web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    this.web3 = web3;
    var newAddress = web3.eth.accounts.create(web3.utils.randomHex(128));
    this.setState({
      accounts: newAddress.address,
      privateKey: newAddress.privateKey
    });
    console.log("ming");
    web3.eth.getAccounts().then(
      accounts => {
        createContract(this.web3, accounts[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

  handleClick() {
    console.log(this.web3);
    var newAddress = this.web3.eth.accounts.create(
      this.web3.utils.randomHex(128)
    );
    this.setState({
      accounts: newAddress.address,
      privateKey: newAddress.privateKey
    });
  }

  handleShowPrivateKey() {
    this.setState({ showProviateKey: !this.state.showProviateKey });
  }

  render() {
    var { accounts, privateKey, showProviateKey } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Create a new account i </button>
        <h1>Address:</h1>
        <p />
        <h2>{accounts}</h2>
        <button onClick={this.handleShowPrivateKey}>
          Show private key, or not i{" "}
        </button>
        <h1>Private Key:</h1>
        <p />
        <h3>{showProviateKey ? privateKey : "not to show"}</h3>
      </div>
    );
  }
}

export default Web3console;
