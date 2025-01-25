// Import the MerkleTree library and crypto-js for hashing
const { MerkleTree } = require('merkletreejs');
const CryptoJS = require('crypto-js');

// Step 1: Sample Ethereum addresses
// These are the input data points (e.g., wallet addresses)
const addresses = [
  '0x1234567890abcdef1234567890abcdef12345678',
  '0xabcdefabcdefabcdefabcdefabcdefabcdef',
  '0x9876543210abcdef9876543210abcdef98765432',
  '0xfedcba9876543210fedcba9876543210fedcba98',
  '0x11223344556677889900aabbccddeeff11223344',
];

console.log('Addresses:', addresses);

// Step 2: Hash each address using SHA-256
// Convert each Ethereum address into a cryptographic hash
const leaves = addresses.map((addr) => CryptoJS.SHA256(addr).toString());
console.log('\nHashed Leaves:', leaves);

// Step 3: Create a Merkle Tree using the hashed leaves
// Pass the hashed leaves and the SHA-256 hashing function to the MerkleTree constructor
const tree = new MerkleTree(leaves, (data) => CryptoJS.SHA256(data).toString());

// Step 4: Get the Merkle Root
// The root is the single hash that represents the entire tree
const root = tree.getRoot().toString('hex');
console.log('\nMerkle Root:', root);

// Step 5: Verify a specific address
// Choose an address to test
const testAddress = '0x1234567890abcdef1234567890abcdef12345678';

// Hash the test address to match the hashed leaves
const testLeaf = CryptoJS.SHA256(testAddress).toString();

// Generate a proof for the test address
const proof = tree.getProof(testLeaf);
console.log('\nProof for Test Address:', proof.map((p) => p.data.toString('hex')));

// Verify the proof
// Check if the proof matches the root for the test address
const isValid = tree.verify(proof, testLeaf, tree.getRoot());
console.log('\nIs the Test Address Valid?', isValid);

// Step 6: Optional: Print the Merkle Tree structure
console.log('\nMerkle Tree Structure:\n', tree.toString());
