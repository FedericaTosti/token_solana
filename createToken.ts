import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as fs from "fs";

// Carica il wallet dal file
const walletData = JSON.parse(fs.readFileSync("wallet.json", "utf-8"));
const secretKey = Uint8Array.from(Buffer.from(walletData.secretKey, "hex"));
const wallet = Keypair.fromSecretKey(secretKey);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const createToken = async () => {
  // Crea un nuovo token
  const token = await Token.createMint(
    connection,
    wallet,
    wallet.publicKey,
    null,
    9, // Decimali
    TOKEN_PROGRAM_ID
  );

  // Ottieni l'indirizzo del token
  const tokenPublicKey = token.publicKey.toBase58();

  console.log("Token Public Key:", tokenPublicKey);
};

createToken();
