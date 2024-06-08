import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

const generateKeypair = () => {
  const keypair = Keypair.generate();
  const secretKey = Buffer.from(keypair.secretKey).toString("hex");
  const publicKey = keypair.publicKey.toBase58();

  console.log("Public Key:", publicKey);
  console.log("Secret Key:", secretKey);

  fs.writeFileSync("wallet.json", JSON.stringify({ publicKey, secretKey }));
};

generateKeypair();
