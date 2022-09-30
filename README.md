## evmctl
evmctl lets you run web3 commands against custom rpc/websocket endpoints and compare them

for example you can test if an rsk node is synced by comparing the output to the official rsk endpoint by running:

```./evmctl.js test -r http://{rpc_endpoint} -w ws://{websocket_endpoint} -c https://public-node.rsk.co/```
where -r,-w are test endpoints and -u is in this example the official mainnet rpc endpoint

You can test performance to specify values below. To test all methods please specify option ```all```
```./evmctl.js perf -r ${RSK_ENDPOINT}  -m ${RPC_METHOD}  -a ${ATTEMPTS} -i ${INTERVAL}"```



for more info run:
$ ./evmtst.js --help

* rsk official rpc endpoint: https://public-node.testnet.rsk.co
