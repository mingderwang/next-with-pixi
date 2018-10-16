import React from "react";
import Web3 from "web3";

function subBlock(web3) {
  web3.eth
    .subscribe("newBlockHeaders", function(error, blockHeader) {
      if (error) console.log("e:", error);
      console.log("b:", blockHeader);
    })
    .on("data", function(blockHeader) {
      // alternatively we can log it here
      console.log("blockHeader: ", blockHeader);
    });
}

function sub(web3) {
  var subscription = web3.eth
    .subscribe("newBlockHeaders", function(error, success) {
      if (error) {
        console.log("error: ", error);
      }
      if (success) {
        console.log("success: ", success);
      }
    })
    .on("data", function(transactionHash) {
      console.log("D:", transactionHash);
      web3.eth
        .getTransaction(transactionHash)
        .then(function(error, transaction) {
          if (error) {
            console.log("E:", error);
          } else {
            console.log("T:", transaction);
          }
        });
    });
  return subscription;
}

function unsub(web3, subscription) {
  subscription.unsubscribe(function(error, success) {
    if (success) console.log("Successfully unsubscribed!");
  });
}

function createContract(web3, account) {
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
  console.log("test:", account);
  Test.methods
    .myFunction()
    .send({ from: account })
    .on("receipt", function(receipt) {
      console.log(receipt);
    });

  console.log(Test);
  Test.methods
    .myFunction()
    .call()
    .then(console.log);
}

class Web3console extends React.Component {
  web3 = null;
  constructor() {
    super();
    this.state = {
      accounts: "",
      privateKey: "",
      showProviateKey: false,
      no_web3: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleShowPrivateKey = this.handleShowPrivateKey.bind(this);
  }

  componentWillMount() {
    const mnemonic =
      "process eager attend drill owner area casino convince few cheese crazy license";
    var HDWalletProvider = require("truffle-hdwallet-provider");
    var subscription = null;
    web3 = this.web3 = new Web3(
      Web3.givenProvider ||
        //   "http://localhost:8545" ||
        new HDWalletProvider(mnemonic, "wss://ropsten.infura.io/ws")
    );
    //var Ganache = require("ganache-core");
    //web3.setProvider(Ganache.provider());
    // or
    //   web3 = this.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://ropsten.infura.io/"));
    // or
    //  var wshost = web3.currentProvider.host.replace("http", "ws");
    //  var wsProvider = new Web3.providers.WebsocketProvider(wshost);
    //  web3 = this.web3 = new Web3(wsProvider);
    if (web3 !== undefined) {
      console.log(web3);
      this.setState({
        no_web3: false
      });
        subscription = sub(web3);
      console.log("sub ->", subscription);
      //  subBlock(web3);

      web3.eth.getAccounts().then(
        accounts => {
          this.setState({
            accounts: accounts[0],
            privateKey: "************* (default account)"
          });
          //   console.log(accounts[0]);
          createContract(web3, accounts[0]);
        },
        error => {
          console.log("no account", error);
          var newAddress = web3.eth.accounts.create(web3.utils.randomHex(128));
          this.setState({
            accounts: newAddress.address,
            privateKey: newAddress.privateKey
          });
        }
      );
    }
  }

  handleClick() {
    var newAddress = this.web3.eth.accounts.create(
      this.web3.utils.randomHex(128)
    );
    this.setState({
      accounts: newAddress.address,
      privateKey: newAddress.privateKey
    });
    console.log(newAddress.address);
  }

  handleShowPrivateKey() {
    this.setState({ showProviateKey: !this.state.showProviateKey });
  }

  render() {
    if (this.state.no_web3) {
      return <h1>Please install Metamask (plugin)</h1>;
    } else {
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
}
export default Web3console;
