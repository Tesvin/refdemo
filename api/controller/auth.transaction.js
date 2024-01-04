import User from "../model/user.model.js";
import Wallet from "../model/wallet.js";
import WalletTransaction from "../model/wallet_transaction.js";
import Transaction from "../model/transaction.js";
import axios from "axios";
import dotenv from 'dotenv';
import Share from '../model/shares.model.js';
import OrganizationShares from "../model/OrganizationShares.model.js";

dotenv.config();

//...


export const response = async (req, res) => {
    const { transaction_id } = req.query;
  
    // URL with transaction ID of which will be used to confirm transaction status
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  
    // Network call to confirm transaction status
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      },
    });
  
    const { status, currency, id, amount, customer } = response.data.data;
  
    // check if transaction id already exist
  
    const transactionExist = await Transaction.findOne({ transactionId: id });
  
    if (transactionExist) {
      return res.status(409).send("Transaction Already Exist");
    }
    // check if customer exist in our database
    const user = await User.findOne({ email: customer.email });
  
    if (!user) {
      console.log(`User not found for email: ${customer.email}`);
      return res.status(404).send("User not found");
    }

    // check if user have a wallet, else create wallet
    const wallet = await validateUserWallet(user._id);
  
    // create wallet transaction
    await createWalletTransaction(user._id, status, currency, amount);
  
    // create transaction
    await createTransaction(user._id, id, status, currency, amount, customer);
  
    await updateWallet(user._id, amount);
  
    return res.status(200).json({
      response: "wallet funded successfully",
      data: wallet,
    });
  };
  
export const balance = async (req, res) => {
    try {
      const { userId } = req.params;
      //const { userId } = await Wallet.findById(req.params.userId)
      const wallet = await Wallet.findOne({ userId });
      //const wallet = await Wallet.findById({ userId });
      // user
       res.status(200).json(wallet.balance);
    } catch (err) {
      console.log(err);
    }
  };

// export const getBalance = async (req, res) => {
//   try {
//     const balance = await Wallet.findById(req.params.id);
//     if(!balance) {
//       return error
//     }
//     res.status(200).json(balance)
//   } catch (error) {
    
//   }
// }

  export const transaction = async (req, res) => {
    try {
      const { userId } = req.params
      const transaction = await Transaction.findOne({ userId })
      res.status(200).json(transaction)
    } catch (error) {
      console.log(err)
    }
  }

  const validateUserWallet = async (userId) => {
    try {
      // check if user have a wallet, else create wallet
      const userWallet = await Wallet.findOne({ userId });
  
      if (!userWallet) {
        // create wallet
        const wallet = await Wallet.create({
          userId,
        });
        return wallet;
      }
      return userWallet;
    } catch (error) {
      console.log(error);
    }
  };
  
  const createWalletTransaction = async (userId, status, currency, amount) => {
    try {
      // create wallet transaction
      const walletTransaction = await WalletTransaction.create({
        amount,
        userId,
        isInflow: true,
        currency,
        status,
      });
      return walletTransaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  const createTransaction = async (
    userId,
    id,
    status,
    currency,
    amount,
    customer
  ) => {
    try {
      // create transaction
      const transaction = await Transaction.create({
        userId,
        transactionId: id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone_number,
        amount,
        currency,
        paymentStatus: status,
        paymentGateway: "flutterwave",
      });
      return transaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateWallet = async (userId, amount) => {
    try {
      // update wallet
      const wallet = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true }
      );
      return wallet;
    } catch (error) {
      console.log(error);
    }
  };

  //let totalSharesInOrganization = 9000; // Initial total share in the organization

  // Initialize total shares in the organization
  const initializeTotalSharesInOrganization = async () => {
    try {
      let organizationShares = await OrganizationShares.findOne();
      if (!organizationShares) {
        organizationShares = new OrganizationShares({
          totalSharesInOrganization: 9000,
          remainingSharesInOrganization: 9000,
          totalSharesBoughtByUsers: 0,
        });
        await organizationShares.save();
      }
    } catch (error) {
      console.error("Error initializing organization shares:", error);
    }
  };

initializeTotalSharesInOrganization();

  export const calculateShares = async (req, res) => {
    // Calculate total amount in each user's wallet and convert to shares
    try {
        //const { userId } = req.params;
        // Get all wallets 
        let wallets = await Wallet.findOne();

        // Convert to array if it's not already
         if (!Array.isArray(wallets)) {
           wallets = [wallets];
        }

        //console.log("Type of wallets:", typeof wallets);


        if (!Array.isArray(wallets)) {
          return res.status(500).json({ message: "Wallets data is not iterable" });
        }

        // Create an array to store the results
        const results = [];

        // Accumulate total shares bought across all users
        let totalSharesBought = 0;

        // Accumulate total shares bought by all users
        let totalSharesBoughtByUsers = 0;

        // Calculate total amount and convert to shares
        for (const wallet of wallets) {
            const totalAmount = wallet.balance;
            const sharesBought = totalAmount / 25000;
            
            // Check if the user has a share record
            let share = await Share.findOne({ userId: wallet.userId });

            // If the user does not have a share record, create one
            if (!share) {
                share = new Share({
                    userId: wallet.userId,
                    totalShares: 0, // Initialize totalShares to 0
                    lastBalance: totalAmount, // Initialize lastBalance
                    transactions: [{ sharesBought, timestamp: new Date() }],
                    //sharesBought
                });
            } else {
              // Ensure that the transactions array is initialized
              if (!share.transactions) {
                  share.transactions = [];
              }

              // Check if the wallet balance has changed
              if (wallet.balance !== share.lastBalance) {
              // If the user already has a share record and the balance has changed, update the transactions
              share.transactions.push({ sharesBought, timestamp: new Date() });

              // Update the total shares for the user
              share.totalShares = sharesBought;

              // Update the last balance
              share.lastBalance = wallet.balance;
              
              // Subtract sharesBought from totalSharesInOrganization only when the balance changes
              totalSharesBoughtByUsers += sharesBought;
            }
          }

            // Update the total shares for the user
            //share.totalShares += sharesBought;

            // Save the share record 
            await share.save();

            // Update total share in the organization
            //totalSharesInOrganization -= sharesBought;

            // Add the result to the array
            results.push({
                userId: wallet.userId,
                sharesBought,
                totalSharesForUser: share.totalShares,
                remainingSharesInOrganization: share.totalSharesInOrganization,
            });

            // Accumulate sharesBought for all users
            totalSharesBought += sharesBought;
        }

        // Subtract totalSharesBought from totalSharesInOrganization
        //totalSharesInOrganization -= totalSharesBought;

        // Get the latest organization shares from the database
        const organizationShares = await OrganizationShares.findOne();

        // Subtract totalSharesBoughtByUsers from remainingSharesInOrganization
        organizationShares.remainingSharesInOrganization -= totalSharesBoughtByUsers;

        // Update totalSharesBoughtByUsers in the database
        organizationShares.totalSharesBoughtByUsers += totalSharesBoughtByUsers;

        // Save the updated organization shares
        await organizationShares.save();

        return res.status(200).json({ 
            message: 'Shares calculated successfully',
            results,
            totalSharesInOrganization: organizationShares.totalSharesInOrganization,
            remainingSharesInOrganization: organizationShares.remainingSharesInOrganization,
            totalSharesBoughtByUsers: organizationShares.totalSharesBoughtByUsers,
         });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }   
}