module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22000, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node2: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22001, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node3: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22002, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node4: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22003, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node5: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22004, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node6: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22005, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    node7: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 22006, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    }
  },
  rpc: {
    host: "127.0.0.1",
    port: 22000
  },
  compilers: {
    solc: {
    version: "0.4.24"  // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
  }
};
