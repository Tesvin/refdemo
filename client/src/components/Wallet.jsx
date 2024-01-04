import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the useParams hook from React Router to extract the userId from the route
  const params = useParams();
  console.log(params); // Add this line to check the value in the console


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Check if userId is truthy before making the API call
      if (!params) {
        setError('User ID is undefined');
        setLoading(false);
        return;
      }
        // Replace 'YOUR_API_BASE_URL' with the base URL of your API
        const response = await axios.get(`/api/transaction/wallet/${params.userId}`);
        setBalance(response.data);
      } catch (error) {
        setError('Error fetching wallet balance');
      } finally {
        setLoading(false);
      }
    };

    //const userId = "6550db2f5788c5c1572f9856"
    fetchBalance();
  }, [params.userId ]); // Include userId in the dependency array to re-fetch when userId changes


  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {balance !== null && <p>Wallet Balance: {balance}</p>}
    </div>
  );
};

export default WalletBalance;



// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom";


// export default function Dashboard() {
//   const [balance, setBalance] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const params = useParams();
//   //console.log('params:', params);


//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         setLoading(true);
  
//         if (!params.userId) {
//           console.log('params.userId:', params.userId);

//           // Handle the case where userId is undefined
//           setError(true);
//           setLoading(false);
//           return;
//         }
  
//         const res = await fetch(`/api/transaction/wallet/${params.userId}`);
        
//         const data = await res.json();
  
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
  
//         setBalance(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//         setError(true);
//         setLoading(false);
//       }
//     };
  
//     fetchBalance();
//   }, [params.userId]);
  

//   return (
//       <div className="">
//         {loading && <p>Loading...</p>}
//         {error && <p>Error loading balance.</p>}
//         {balance && <p>Balance: {balance}</p>}
//       </div>
//     );
// }
