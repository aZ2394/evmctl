#!/usr/bin/env node
import meow from 'meow'
import evmctlImpl from './lib/evmctlImpl.js'
import txProc from './lib/txProc.js'
import perf from './lib/perf.js'

const cli = meow(
	`
	Usage
	  $ ./evmctl.js [action] [options]

  action:
    test - test evm compatible node
    txproc - long test for tx processed
    perf - execute RPC methods
	Options
	  --rpcurl, -r rpc cluster/node url address
	  --wsurl, -w websocket cluster/node url address
	  --method, -m web3 method to test, default getBlockNumber, all will run all methods
	  --urlToCompare, -c rpc/websocket rpc url address to compare against
	  --attempts, -a number of attempts for performance testing
          --network, -n rsk/bsc endpoint network

	Examples
	  $ ./evmctl.js --help
    $ ./evmctl.js test -r http://{rpc_endpoint} -w ws://{wss_endpoint}
    $ ./evmctl.js txproc -r http://{rpc_endpoint}
    $ ./evmctl.js perf -r http://{rpc_endpoint} -m all
`,
	{
		importMeta: import.meta,
		flags: {
			rpcurl: {
				type: 'string',
				alias: 'r',
				default: '',
			},
			wsurl: {
				type: 'string',
				alias: 'w',
				default: '',
			},
			urlToCompare: {
				type: 'string',
				alias: 'c',
				default: 'https://public-node.rsk.co/',
			},
			method: {
				type: 'string',
				alias: 'm',
				default: 'getBlockNumber',
			},
			attempts: {
				type: 'number',
				alias: 'a',
				default: 10,
			},
			interval: {
				type: 'number',
				alias: 'i',
				default: 10,
			},
		},
	}
)
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/
if (cli.input.length == 0) {
	cli.showHelp(2)
}
console.log('flags: ', cli.flags)
if (cli.input[0] == 'test') {
	evmctlImpl(cli.input, cli.flags)
} else if (cli.input[0] == 'txProc') {
	txProc(cli.input, cli.flags)
} else if (cli.input[0] == 'perf') {
	perf(cli.input, cli.flags)
}
  
  else {
	console.log('action ', cli.input[0], 'is not defined')
}
