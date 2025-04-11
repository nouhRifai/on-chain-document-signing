use anchor_lang::prelude::*;


#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
pub enum SignatureStatus {
    Active,
    Revoked,
}

#[account]
#[derive(Debug)]
pub struct Document {
    pub hash: [u8;32],             // The document hash
    pub bump: u8,                  // Bump used to derive the PDA
    pub signer: Pubkey,            // Signer's public key
    pub signature_id: u64,         // Unique ID for this signature
    pub status: SignatureStatus,   // Status of the signature (Active or Revoked)
    pub prev_signature: Pubkey,    // Previous signature in the chain (or default if first)
    pub next_signature: Pubkey,    // Next signature in the chain (or default if last)
}