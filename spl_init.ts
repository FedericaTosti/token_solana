// spl_init.ts
import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as fs from "fs";

// Configurare la connessione alla Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Generare un nuovo wallet
const wallet = Keypair.generate();
fs.writeFileSync("wallet.json", JSON.stringify(Array.from(wallet.secretKey)));

// Richiedere un airdrop di 1 SOL
const airdrop = async () => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      LAMPORTS_PER_SOL // 1 SOL
    );

    // Confermare la transazione di airdrop
    await connection.confirmTransaction(airdropSignature);
    console.log(
      `Airdrop successful! Transaction Signature: ${airdropSignature}`
    );

    // Stampare la chiave pubblica del wallet
    console.log("Wallet Public Key:", wallet.publicKey.toBase58());
  } catch (error) {
    console.error("Initialization failed:", error);
  }
};

airdrop();
