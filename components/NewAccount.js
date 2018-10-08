import React from "react";
import Web3 from "web3";

function createContract(web3, account) {
  console.log(account)
  var myContract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [{ name: "a", type: "uint256[20]" }],
        name: "test2",
        outputs: [{ name: "b", type: "uint256" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "a", type: "uint256[20]" }],
        name: "test",
        outputs: [{ name: "b", type: "uint256" }],
        payable: false,
        stateMutability: "pure",
        type: "function"
      }
    ],
    "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a",
    {
      from: account,
      gasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
    }
  );
  myContract
    .deploy({
      data:
        "0x608060405234801561001057600080fd5b5060f78061001f6000396000f30060806040526004361060485763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166339444b998114604d578063fd5e5c0d146073575b600080fd5b348015605857600080fd5b506061600460b5565b60408051918252519081900360200190f35b348015607e57600080fd5b506040805161028081810190925260619136916004916102849190839060149083908390808284375093965060c095505050505050565b610140013560020290565b6101400151600202905600a165627a7a72305820068a9428daeea1f0ac7723b7058db63034321900d725673612fd8cfa54daa2370029",
      arguments: []
    })
    .send({
      from: account,
      gas: 1500000,
      gasPrice: "30000000000000"
    })
    .then(function(newContractInstance) {
      newContractInstance.methods
        .test([1, 2, 3, 4, 5, 6, 7, 8, 9, 1000, 10000, 2, 3, 4, 5, 6, 7, 8, 9, 20])
        .send({ from: account })
        .on("transactionHash", function(hash) {
          console.log("transactionHash: ", hash);
        })
        .on("receipt", function(receipt) {
          console.log('receipt: ',receipt);
        })
        .on("confirmation", function(confirmationNumber, receipt) {
          console.log('confirm: ',receipt, confirmationNumber); 
        })
        .on("error", console.error);
    });
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
    console.log('ming')
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
