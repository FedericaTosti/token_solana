import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Configurare la connessione alla Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Generare un nuovo wallet
const wallet = Keypair.generate();

// Stampare la chiave pubblica del wallet
console.log("Public Key:", wallet.publicKey.toBase58());

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
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
};

airdrop();
