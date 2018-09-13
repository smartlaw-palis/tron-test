module.exports = {
  networks: {
      development: {
          // from: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
          // privateKey:'D95611A9AF2A2A45359106222ED1AFED48853D9A44DEFF8DC7913F5CBA727366',
          from: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
          privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
          consume_user_resource_percent: 30,
          fee_limit: 1000000000,
          host: "127.0.0.1",
          port: 16667,
          eventServer: "",
          network_id: "*" // Match any network id
      },
      production: {
          // from: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
          // privateKey:'D95611A9AF2A2A45359106222ED1AFED48853D9A44DEFF8DC7913F5CBA727366',
          from: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
          privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
          consume_user_resource_percent: 30,
          fee_limit: 1000000000,
          host: "52.44.75.99",
          port: 8090,
          eventServer: "",
          network_id: "*" // Match any network id
      }
  }
};
