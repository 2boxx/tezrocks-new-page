import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Console } from "console";

function SyncWallet(){
  const TezosToolkit = require("@taquito/taquito");
  const BeaconWallet = require("@taquito/beacon-wallet");
    const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
    const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
    
    Tezos.setWalletProvider(wallet);
    
    // The following code should always be run during pageload if you want to show if the user is connected.
    const activeAccount = await wallet.client.getActiveAccount();
    
    await wallet.requestPermissions({
        network: {
          type: 'mainnet' | 'granadanet' | 'hangzhounet' | 'custom',
        },
      });
    
      const userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      console.Log(userAddress);
    }