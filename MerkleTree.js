const { MerkleTree } = require('merkletreejs');
const CryptoJS = require('crypto-js');

const addresses = [
  '0x1234567890abcdef1234567890abcdef12345678',
  '0xabcdefabcdefabcdefabcdefabcdefabcdef',
  '0x9876543210abcdef9876543210abcdef98765432',
  '0xfedcba9876543210fedcba9876543210fedcba98',
  '0x11223344556677889900aabbccddeeff11223344',
];

// console.log('Addresses:', addresses);

const leaves = addresses.map((address) => CryptoJS.SHA256(address).toString());
// console.log('\nHashed Leaves:', leaves);

const tree = new MerkleTree(leaves, (data) => CryptoJS.SHA256(data).toString());

const root = tree.getRoot().toString('hex');
// console.log('\nMerkle Root:', root);

const testAddress = '0x1234567890abcdef1234567890abcdef12345678';

const testLeaf = CryptoJS.SHA256(testAddress).toString();

const proof = tree.getProof(testLeaf);
// console.log('\nProof for Test Address:', proof.map((p) => p.data.toString('hex')));

const isValid = tree.verify(proof, testLeaf, tree.getRoot());
console.log('\nIs the Test Address Valid?', isValid);

// console.log('\nMerkle Tree Structure:\n', tree.toString());
