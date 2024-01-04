// import express from 'express';
// import Wallet from '../model/shares.model.js';
// import Share from '../model/shares.model.js';

// let totalSharesInOrganization = 9000; // Initial total share in the organization

// export const calculateShares = async (req, res) => {
//     // Calculate total amount in each user's wallet and convert to shares
//     try {
//         // Get all wallets 
//         const wallets = await Wallet.find();

//         // Create an array to store the results
//         const results = [];

//         // Calculate total amount and convert to shares
//         for (const wallet of wallets) {
//             const totalAmount = wallet.balance;
//             const sharesBought = Math.floor(totalAmount / 25000);

//             // Update total share in the organization
//             totalSharesInOrganization -= sharesBought;

//             // Check if the user has a share record
//             let share = await Share.findOne({ userId: wallet.userId });

//             // If the user does not have a share record, create one
//             if (!share) {
//                 share = new Share({
//                     userId: wallet.userId,
//                     sharesBought
//                 });
//             } else {
//                 // If the user already has a share record, update the total shares
//                 share.sharesBought = sharesBought;
//             }

//             // Save the share record 
//             await share.save();

//             // Add the result to the array
//             results.push({
//                 userId: wallet.userId,
//                 sharesBought: share.sharesBought,
//                 remainingSharesInOrganization: totalSharesInOrganization
//             });
//         }

//         return res.status(200).json({ 
//             message: 'Shares calculated successfully',
//             results,
//          });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }   
// }