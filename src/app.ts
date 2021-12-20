import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import $ from "jquery";

export class App {
  private tk: TezosToolkit;
  private bw: BeaconWallet;

  constructor() {
    this.tk = new TezosToolkit("https://api.tez.ie/rpc/mainnet");
    this.bw = new BeaconWallet({ name: "Beacon Docs Taquito" })
  }

  public initUI() {
    $("#show-balance-button").bind("click", () =>
      this.getBalance($("#address-input").val())
    );
  }

  private showError(message: string) {
    $("#balance-output").removeClass().addClass("hide");
    $("#error-message")
      .removeClass()
      .addClass("show")
      .html("Error: " + message);
  }

  private showBalance(balance: number) {
    $("#error-message").removeClass().addClass("hide");
    $("#balance-output").removeClass().addClass("show");
    $("#balance").html(balance);
  }

  private getBalance(address: string) {
    this.tk.rpc
      .getBalance(address)
      .then(balance => this.showBalance(balance.toNumber() / 1000000))
      .catch(e => this.showError("Address not found"));
  }

  public async SyncWallet(){
      this.tk.setWalletProvider(this.bw);
      
      // The following code should always be run during pageload if you want to show if the user is connected.
      const activeAccount = await this.bw.client.getActiveAccount();
      
      let article: { title: string, text: string } = {} as { title: string, text: string };

      
      await this.bw.requestPermissions({
        network: {
          type: 'mainnet' | 'granadanet' | 'hangzhounet' | 'custom',
        },
      });
      
        const userAddress = await this.bw.getPKH();
        this.tk.setWalletProvider(this.bw);
        console.log(userAddress);
  }
}
