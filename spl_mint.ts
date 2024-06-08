// spl_mint.ts
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as fs from "fs";

// Configurare la connessione alla Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Caricare il wallet dal file
const secretKey = Uint8Array.from(
  JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
);
const wallet = Keypair.fromSecretKey(secretKey);

// Caricare il mint address dal file
const mintAddress = JSON.parse(fs.readFileSync("mint.json", "utf-8")).mint;

const mintTokens = async () => {
  try {
    // Creare il mint dal mint address
    const mint = new Token(connection, mintAddress, TOKEN_PROGRAM_ID, wallet);

    // Creare un account associato al wallet per ricevere i token mintati
    const associatedTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    );

    // Mintare 1000 token al wallet
    await mint.mintTo(
      associatedTokenAccount.address, // Indirizzo dell'account associato
      wallet.publicKey, // Proprietario del mint
      [], // Firmatari
      1000 * Math.pow(10, 9) // Quantità di token (moltiplicato per 10^9 per gestire i decimali)
    );

    console.log("Tokens minted successfully!");
  } catch (error) {
    console.error("Minting failed:", error);
  }
};

mintTokens();
