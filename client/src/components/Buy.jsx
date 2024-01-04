import { useState } from "react";
import { useDispatch } from "react-redux";
import { paymentFailure, paymentStart, paymentSuccess } from "../redux/user/userSlice";
// import { useNavigate } from "react-router-dom";


export default function Buy() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
    // const value = parseInt(e.target.value);
    // setShares(value);
    // setShares2(value * 25000);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(paymentStart());
      const res = await fetch("/api/auth/flutterwave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(paymentFailure(data.message));
        return;
      }
      dispatch(paymentSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(paymentFailure(error.message));
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button>
            PAY
           {/* {loading ? "loading..." : "Proceed to Payment"} */}
        </button>
      </form>
      </div>
    </div>
  );
}




// function IncrementByTwo() {
//   const [inputValue1, setInputValue1] = useState();
//   const [inputValue2, setInputValue2] = useState();

//   const handleInputChange1 = (e) => {
//     const value = parseInt(e.target.value, 10) || 0;
//     setInputValue1(value);
//     setInputValue2(value * 25000);
//   };

//   return (
//     <div>
//       <label>
//         Input 1:
//         <input
//           type="number"
//           value={inputValue1}
//           onChange={handleInputChange1}
//         />
//       </label>
//       <br />
//       <label>
//         Input 2 (Incremented by 2):
//         <input
//           type="number"
//           value={inputValue2}
//           readOnly
//         />
//       </label>
//     </div>
//   );
// }

// export default IncrementByTwo;
