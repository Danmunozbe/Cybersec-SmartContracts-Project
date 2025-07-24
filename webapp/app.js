const abi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "_age", "type": "uint256" }],
    "name": "setAge", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "setName", "outputs": [], "stateMutability": "nonpayable", "type": "function"
  },
  {
    "inputs": [], "name": "getAge", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
  },
  {
    "inputs": [], "name": "getName", "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view", "type": "function"
  }
];

let provider, signer, contract;

async function connect() {
  const inputAddress = document.getElementById("contractAddressInput").value.trim();

  if (!ethers.utils.isAddress(inputAddress)) {
    alert("Invalid contract address.");
    return;
  }

  try {
    if (!window.ethereum) {
      alert("Please install MetaMask or Enkrypt");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(inputAddress, abi, signer);

    document.getElementById("status").innerText = "Connected to contract: " + inputAddress;
  } catch (err) {
    console.error("Connection error:", err);
    document.getElementById("status").innerText = "Connection failed";
  }
}

async function setName() {
  const name = document.getElementById("nameInput").value;
  try {
    const tx = await contract.setName(name);
    await tx.wait();
    alert("Name set successfully!");
  } catch (err) {
    console.error("Error setting name:", err);
    alert("Failed to set name");
  }
}

async function getName() {
  try {
    const name = await contract.getName();
    document.getElementById("nameResult").innerText = name;
  } catch (err) {
    console.error("Error calling getName():", err);
    alert("Failed to get name");
  }
}

async function setAge() {
  const age = parseInt(document.getElementById("ageInput").value);
  try {
    const tx = await contract.setAge(age);
    await tx.wait();
    alert("Age set successfully!");
  } catch (err) {
    console.error("Error setting age:", err);
    alert("Failed to set age");
  }
}

async function getAge() {
  try {
    const age = await contract.getAge();
    document.getElementById("ageResult").innerText = age;
  } catch (err) {
    console.error("Error calling getAge():", err);
    alert("Failed to get age");
  }
}
