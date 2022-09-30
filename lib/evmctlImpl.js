import Web3 from "web3";

async function evmctlImpl(cliinput, flags) {
  
  let urlToCompare = new Web3(flags["urlToCompare"]);
  console.log("web3 connecting to:", flags["urlToCompare"]);
  const urlToCompareweb3 = await urlToCompare.eth.getBlockNumber();
  
  let rpcurl = new Web3(flags["rpcurl"]);
  console.log("web3 connecting to:", flags["rpcurl"]);
  const rpcurlweb3 = await rpcurl.eth.getBlockNumber();
  
  let wsurl = new Web3(flags["wsurl"]);
  console.log("web3 connecting to:", flags["wsurl"]);
  const wsurlweb3 = await wsurl.eth.getBlockNumber();

  setInterval(() => {
    async function t() {
      console.log("comparing latest blocks - rpc/ws/compared_to: " + rpcurlweb3 + "/" + wsurlweb3 + "/" + urlToCompareweb3);
    }
    t();
  }, 1000);
}

export default evmctlImpl;
