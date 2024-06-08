// spl_transfer.ts
import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as fs from "fs";

// Configurare la connessione alla Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Caricare il wallet dal file
const secretKey = Uint8Array.from(
  JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
);
const wallet = Keypair.fromSecretKey(secretKey);

// Generare un nuovo wallet destinatario
const recipientWallet = Keypair.generate();
console.log("Recipient Public Key:", recipientWallet.publicKey.toBase58());

// Funzione per trasferire i lamport
const transferLamports = async () => {
  try {
    // Quantità di lamport da trasferire (ad esempio 0.1 SOL)
    const amount = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL

    // Creare la transazione
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientWallet.publicKey,
        lamports: amount,
      })
    );

    // Inviare e confermare la transazione
    const signature = await connection.sendTransaction(transaction, [wallet]);
    await connection.confirmTransaction(signature, "confirmed");

    console.log("Lamports transferred successfully!");
    console.log(`Transaction Signature: ${signature}`);
  } catch (error) {
    console.error("Transfer failed:", error);
  }
};

transferLamports();
