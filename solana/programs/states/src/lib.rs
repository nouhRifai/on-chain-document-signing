use anchor_lang::prelude::*;

pub mod states;

use crate::states::*;
// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("8AhdpxPB9W8jSRsftfFYxwuwgoRm7KbcP62JFFUipWV4");

#[program]
mod hello_anchor {
    use super::*;

    pub fn initial_sign_document(ctx: Context<InitialDocumentSignature>, hash: [u8;32], signature_id: u64, bump: u8) -> Result<()> {
        // Set up the new signature document
        let document = &mut ctx.accounts.document;
        document.hash = hash;
        document.signer = ctx.accounts.signer.key();
        document.signature_id = signature_id;
        document.bump = bump;
        document.status = SignatureStatus::Active;
        document.prev_signature = Pubkey::default();
        document.next_signature = Pubkey::default();

        msg!("Document signed with hash: {:?}, signature_id: {}", hash, signature_id);
        Ok(())
    }
    
    pub fn multi_sign_document(ctx: Context<DocumentMultiSignature>, hash: [u8;32], signature_id: u64, bump: u8) -> Result<()> {
        // Set up the new signature document
        let document = &mut ctx.accounts.document;
        document.hash = hash;
        document.signer = ctx.accounts.signer.key();
        document.signature_id = signature_id;
        document.bump = bump;
        document.next_signature = Pubkey::default();
        let prev_doc_mut = &mut ctx.accounts.prev_signature;
        document.prev_signature = prev_doc_mut.key();
        prev_doc_mut.next_signature = document.key();
        document.status = SignatureStatus::Active;
        msg!("Document signed with hash: {:?}, signature_id: {}", hash, signature_id);
        Ok(())
    }

    pub fn revoke_signature(ctx: Context<RevokeSignature>, hash: [u8;32]) -> Result<()> {
        // Mark the signature as revoked
        let document = &mut ctx.accounts.document;
        
        // Ensure only the original signer can revoke
        require!(
            document.signer == ctx.accounts.signer.key(),
            ErrorCode::UnauthorizedRevocation
        );
        
        // Ensure only the original signer can revoke
        require!(
            document.next_signature == Pubkey::default(),
            ErrorCode::HasNextSignature
        );
        
        // Update the signature status
        document.status = SignatureStatus::Revoked;
        
        msg!("Signature revoked for document hash: {:?}", hash);
        Ok(())
    }
    
    pub fn delete_sub_signature(ctx: Context<DeleteSubSignature>) -> Result<()> {
        let document = &mut ctx.accounts.document;
        let prev_document = &mut ctx.accounts.prev_document;

        // Ensure only the original signer can delete
        require!(
            document.signer == ctx.accounts.signer.key(),
            ErrorCode::UnauthorizedRevocation
        );
        require!(
            document.next_signature == Pubkey::default(),
            ErrorCode::HasNextSignature
        );
        require!(
            document.prev_signature != Pubkey::default(),
            ErrorCode::HasNoPrevSignature
        );

        prev_document.next_signature = Pubkey::default();
        msg!("Document signature deleted: {:?} by {:?}", document.key(), ctx.accounts.signer);
        Ok(())
    }
    
    pub fn delete_first_signature(ctx: Context<DeleteFirstSignature>) -> Result<()> {
        let document = &mut ctx.accounts.document;

        // Ensure only the original signer can delete
        require!(
            document.signer == ctx.accounts.signer.key(),
            ErrorCode::UnauthorizedRevocation
        );
        require!(
            document.next_signature == Pubkey::default(),
            ErrorCode::HasNextSignature
        );
        require!(
            document.prev_signature == Pubkey::default(),
            ErrorCode::HasPrevSignature
        );
        msg!("Document signature deleted: {:?} by {:?}", document.key(), ctx.accounts.signer);
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(hash: [u8;32], signature_id: u64, bump: u8)]
pub struct InitialDocumentSignature<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    
    #[account(
        init,
        seeds = [
            hash.as_ref(), 
            signer.key().as_ref(),
            signature_id.to_le_bytes().as_ref()
        ],
        bump,
        payer = signer, 
        space = 8 + std::mem::size_of::<Document>()
    )]
    pub document: Account<'info, Document>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(hash: [u8;32], signature_id: u64, bump: u8)]
pub struct DocumentMultiSignature<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    
    #[account(
        init,
        seeds = [
            hash.as_ref(), 
            signer.key().as_ref(),
            signature_id.to_le_bytes().as_ref()
        ],
        bump,
        payer = signer, 
        space = 8 + std::mem::size_of::<Document>()
    )]
    pub document: Account<'info, Document>,
    

    /// CHECK: Optional previous signature account (writable)
    #[account(mut)]
    pub prev_signature: Account<'info, Document>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeSignature<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    
    #[account(mut)]
    pub document: Account<'info, Document>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteSubSignature<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub prev_document: Account<'info, Document>,
    #[account(mut, close = signer)]
    pub document: Account<'info, Document>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteFirstSignature<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut, close = signer)]
    pub document: Account<'info, Document>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Only the original signer can revoke their signature")]
    UnauthorizedRevocation,
    #[msg("Document hash mismatch")]
    HashMismatch,
    #[msg("Other signatures must be revoked before you can revoke yours")]
    HasNextSignature,
    #[msg("Invalid delete function. Try deleteFirstSignature")]
    HasNoPrevSignature,
    #[msg("Invalid delete function. Try deleteSubSignature")]
    HasPrevSignature,
}