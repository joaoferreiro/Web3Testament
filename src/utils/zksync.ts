import {utils, Provider} from 'zksync-web3';
import * as ethers from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const contractAbi = require('../contract/contractAbi.json');
const factoryContractAbi = require('../contract/factorycontractAbi.json');

// Put the address of your AA factory
const W_FACTORY_ADDRESS = '0x14E464A207f2CB002c7cd261Bdd2Db2be031A019';

// An example of a deploy script deploys and calls a simple contract.
export default async function (
  connector: any,
  walletAddress: string,
  days: number,
  familyData: {address: string; name: string}[],
) {
  const zkSyncProvider = new Provider('https://zksync2-testnet.zksync.dev');

  const wFactory = new ethers.Contract(
    W_FACTORY_ADDRESS,
    factoryContractAbi.abi,
    zkSyncProvider,
  );

  const salt = ethers.constants.HashZero;

  console.log('Deploying new wallnut instance');

  const tx = await wFactory.populateTransaction.deployAccount(
    salt,
    walletAddress,
    days,
  );

  await connector.sendTransaction({
    from: walletAddress,
    ...tx,
  });

  // Getting the address of the deployed contract
  const abiCoder = new ethers.utils.AbiCoder();
  const wallnutAddress = utils.create2Address(
    W_FACTORY_ADDRESS,
    await wFactory.aaBytecodeHash(),
    salt,
    abiCoder.encode(['address', 'uint'], [walletAddress, days]),
  );

  console.log(`Wallnut launched to address ${wallnutAddress}`);

  const wallnut = new ethers.Contract(
    wallnutAddress,
    contractAbi.abi,
    zkSyncProvider,
  );

  //   await Promise.all(
  //     familyData.map(async ({address, name}: {address: string; name: string}) => {
  //       const tx1 = await wallnut.populateTransaction.addMember(
  //         address,
  //         name,
  //         'pfp1',
  //       );
  //       await connector.sendTransaction({
  //         from: wallnutAddress,
  //         ...tx1,
  //       });
  //     }),
  //   );
  AsyncStorage.setItem('testamint', JSON.stringify(familyData));
  return wallnutAddress;
}
