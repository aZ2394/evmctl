import Web3 from "web3";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function generateRandom(maxLimit = 100){
  let rand = Math.random() * maxLimit;

  rand = Math.floor(rand); // 99

  return rand;
}

async function perf(cliinput, flags) {
  
  let rpcendpoint = flags["rpcurl"];
  let wsendpoint = flags["wsurl"];
  if (rpcendpoint) {
    var web3 = new Web3 (flags["rpcurl"]);
    console.log("web3 connecting to:", flags["rpcurl"]);
  } else if (wsendpoint) {
    var web3 = new Web3 (flags["wsurl"]);
    console.log("web3 connecting to:", flags["wsurl"]);
  } else {
    console.log("--rpcurl or --wsurl must be defined")
  }
  let attempts = flags["attempts"];
  let method = flags["method"];
  let interval = flags["interval"];
 
  var iteration = 1;
  var performance_check = setInterval(() => {
    async function perf() { 
      if (method === "getBlockNumber"){
        let rpcquery1 = await web3.eth.getBlockNumber();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query1 - getBlockNumber - rpc: " + rpcquery1);
      }
      if (method === "getBalance"){
        let account = await web3.eth.accounts.create()
        let rpcquery2 = await web3.eth.getBalance((account.address).toString(),'latest');
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log(account.address)
        console.log("query2 - getBalance - rpc: " + rpcquery2);
      }
      if (method === "getBlock"){
        let rpcquery3 = await web3.eth.getBlock(0x404b6d);
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query3 - getBlock - rpc:" + JSON.stringify(rpcquery3.number));
      }
      if (method === "getCode"){
        let account = await web3.eth.accounts.create()
        let rpcquery4 = await web3.eth.getCode((account.address).toString(), "latest");
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++));
        console.log(account.address);
        console.log("query4 - getCode - rpc:" + JSON.stringify(rpcquery4.slice(-1)));
      }
      if (method === "getGasPrice"){
        let rpcquery5 = await web3.eth.getGasPrice();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query5 - gasPrice - rpc:" + JSON.stringify(rpcquery5));
      }
      if (method === "eth_call"){
        const config = {"data":"0x29d5277c000000000000000000000000542fda317318ebf1d3deaf76e0b632741a7e677d000000000000000000000000542fda317318ebf1d3deaf76e0b632741a7e677d","to":"0x437ac62769f386b2d238409b7f0a7596d36506e4"}
        let rpcquery6 = await web3.eth.call(config,'latest');
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query6 - eth_call with args - rpc:" + JSON.stringify(rpcquery6.slice(-1)));
      }
      if (method === "eth_syncing"){
        let rpcquery7 = await web3.eth.isSyncing();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query7 - eth_syncing - rpc:" + JSON.stringify(rpcquery7));
        
      }
      if (method === "getTransactionReceipt"){
        let rpcquery7 = await web3.eth.isSyncing();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query7 - eth_syncing - rpc:" + JSON.stringify(rpcquery7));
      }
      if (method === "net_listening"){
        let rpcquery9 = await web3.eth.net.isListening();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query9 - net_listening - rpc:" + JSON.stringify(rpcquery9));
        
      }
      if (method === "net_version"){
        let rpcquery10 = await web3.eth.net.isListening();
        console.log('\x1b[33m%s\x1b[0m','Run perforamnce iteration '+(iteration++))
        console.log("query10 - net_version - rpc:" + JSON.stringify(rpcquery10));
        
      }
      if (method === "all"){
          try {
            let rpcquery1 = await web3.eth.getBlockNumber();
            let blockN = generateRandom(rpcquery1); 
            let rpcquery2 = await web3.eth.getBlock(blockN);
            if (rpcquery2.transactions.length > 0) {
              for (var i = 0; i < rpcquery2.transactions.length; i++) { 
                var rpcquery3 = await web3.eth.getTransactionReceipt(rpcquery2.transactions[i]);
                var trx_logs = rpcquery3.logs
                if (trx_logs.length > 0) {
                  try { 
                    shuffle(trx_logs)
                    var rpcquery4 = await web3.eth.getBalance((trx_logs[0].address).toString(),'latest');
                    shuffle(trx_logs)
                    var rpcquery5 = await web3.eth.getCode((trx_logs[0].address).toString(), "latest");
                    break;
                  } catch(error) {
                    console.log(error)
                    continue
                  }
                } else {
                  continue
                } 
              }
              let account = await web3.eth.accounts.create()
              const config = {"data":"0x29d5277c000000000000000000000000542fda317318ebf1d3deaf76e0b632741a7e677d000000000000000000000000542fda317318ebf1d3deaf76e0b632741a7e677d","to": (account.address).toString()}
              var rpcquery6 = await web3.eth.call(config,'latest');
              let rpcquery7 = await web3.eth.getGasPrice();
              let rpcquery8 = await web3.eth.isSyncing();
              let rpcquery9 = await web3.eth.net.isListening();
	      console.log('\n')
	      console.log('\x1b[33m%s\x1b[0m','Run perforamance iteration '+(iteration++))
              console.log("query1 - getBlockNumber - rpc: " + rpcquery1);
              console.log("query2 - getBlock - rpc:" + JSON.stringify(rpcquery2.number));
              console.log("query3 - getTransactionReceipt - rpc:" + JSON.stringify(rpcquery3.blockNumber));
              console.log("query4 - getBalance - rpc: " + rpcquery4);
              console.log("query5 - getCode - rpc:" + JSON.stringify(rpcquery5.slice(-6)));
              console.log("query6 - eth_call with args - rpc:" + JSON.stringify(rpcquery6));
              console.log("query7 - gasPrice - rpc:" + JSON.stringify(rpcquery7));
              console.log("query8 - eth_syncing - rpc:" + JSON.stringify(rpcquery8));
              console.log("query9 - net_listening - rpc:" + JSON.stringify(rpcquery9));
              console.log("done")
              try {
                let rpcquery10 = await web3.eth.getProtocolVersion();
                console.log("query10 - net_version - rpc:" + JSON.stringify(rpcquery10)); 
              } catch {
              }
          }
        } catch(error) {
            console.log(error);
        }
      }
      let date_ob = new Date();
      console.log(date_ob)

      if (iteration > attempts)
      {
          clearInterval(performance_check);
          web3.currentProvider.disconnect();
       }
 
    }


    perf();
  }, interval);

}

export default perf;
