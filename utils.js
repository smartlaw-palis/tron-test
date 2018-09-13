let TronWeb = require("tronweb");
let ethers = require('ethers');
let fs = require('fs');

let tronWeb = new TronWeb('http://127.0.0.1:16667');
tronWeb.setEventServer('http://127.0.0.1:16666');
tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
tronWeb.defaultPk = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';


let walk = (_copy=false) => {
    let _dir = './build/contracts';
    let contracts = [];
    for (let file of fs.readdirSync(_dir)) {
        let json = require(`${_dir}/${file}`);
        contracts[json.contractName] = {
            abi: json.abi,
            bytecode: json.bytecode
        };
    }
    return contracts;
}

let doDeployContract = async info => {
    let contracts = walk();
    let args = [];
    for (let arg of info.arguments) {
        if (typeof arg !== 'function') {
            args.push(arg);
        } else {
            args.push(arg());
        }
    }
    console.log(`Deploying ${info.deployed}...`);
    let abi = contracts[info.contract].abi;
    let bytecode = contracts[info.contract].bytecode;
    let contract = await tronWeb.contract(abi);
    if (args.length > 0) {
        let coder = new ethers.utils.AbiCoder();
        let argsEncoded = coder.encode(info.types, args).replace(/^(0x)/, '');
        bytecode = `${bytecode}${argsEncoded}`;
    }

    let contractInstance = await contract.new({
        from: tronWeb.defaultAccount,
        data: bytecode,
        fee_limit: 100000000,
        call_value: info.value,
        consume_user_resource_percent: 30
    }, tronWeb.defaultPk)
    console.log(`   ${info.deployed}: ${contractInstance.address}`);
    return contractInstance;
}

let doAction = async (_instance, _method, _args, _value = 0) => {
    if (_args && _args.length > 0) {
        let {
            transaction,
            txid,
            result,
            constant_result
        } = await _instance[_method](..._args, {
            fee_limit: 100000000,
            call_value: _value
        });

        if (!constant_result) {
            return await _instance[_method].sendTransaction(transaction, tronWeb.defaultPk);
        } else {
            return constant_result[0];
        }

    } else {
        let {
            transaction,
            txid,
            result,
            constant_result
        } = await _instance[_method]({
            fee_limit: 100000000,
            call_value: _value
        });

        if (!constant_result) {
            return await _instance[_method].sendTransaction(transaction, tronWeb.defaultPk);
        } else {
            return constant_result[0];
        }
    }
}

module.exports = {
    doAction: doAction,
    doDeployContract: doDeployContract
}