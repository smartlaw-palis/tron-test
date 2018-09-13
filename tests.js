let utils = require('./utils.js');

let deployedContracts = [];

let deployInfo = [
    {
        'contract': 'Contract1',
        'links': [],
        'arguments': [],
        'types': [],
        'value': 0,
        'deployed': 'Contract1',
    },
    {
        'contract': 'Contract2',
        'links': [],
        'arguments': [
            () => {
                return (deployedContracts['Contract1'].address).replace(/^(41)/, '0x') 
            }
        ],
        'types': ["address"],
        'value': 0,
        'deployed': 'Contract2',
    },
];

let transactionInfo = [
    
    {
        'deployed': 'Contract2',
        'contract': 'Contract2',
        'function': 'deposit',
        'arguments': [],
        'value': 200*1e6,
        'returnType': ''
    },

    {
        'deployed': 'Contract2',
        'contract': 'Contract2',
        'function': 'deposit2',
        'arguments': [],
        'value': 100*1e6,
        'returnType': ''
    },

    {
        'deployed': 'Contract2',
        'contract': 'Contract2',
        'function': 'balance',
        'arguments': [],
        'value': 0,
        'returnType': 'number'
    },
    {
        'deployed': 'Contract1',
        'contract': 'Contract1',
        'function': 'balance',
        'arguments': [],
        'value': 0,
        'returnType': 'number'
    },

];

let deployContracts = async () => {
    for (let i = 0; i < deployInfo.length; i++) {
        let info = deployInfo[i];
        let args = [];
        for (let arg of info.arguments) {
            if (typeof arg !== 'function') {
                args.push(arg);
            } else {
                args.push(arg());
            }
        }
        info.arguments = args;
        deployedContracts[info.deployed] = await utils.doDeployContract(info);
    }
}

let deployTransactions = async () => {
    console.log('')
    console.log('')
    for (let i = 0; i < transactionInfo.length; i++) {
        let info = transactionInfo[i];
        let contractInstance = deployedContracts[info.deployed];
        let args = [];
        for (let arg of info.arguments) {
            if (typeof arg !== 'function') {
                args.push(arg);
            } else {
                args.push(arg());
            }
        }
        let res  = await utils.doAction(contractInstance, info.function, args, info.value);
        console.log(`${info.deployed}.${info.function} done...`);
        if(info.returnType == 'number')
            console.log(Number(res))
        else
            console.log(res)
    }
}

let deploy = async () => {
    try {
        await deployContracts();
        await deployTransactions();
    } catch (err) {
        console.log(err)
    }
}

deploy()
    .then(() => {
        console.log('done...');
    })
    .catch(err => {
        cosnole.log(err);
    })