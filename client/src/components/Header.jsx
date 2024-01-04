import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
//import Flutterwave from "./flutterwavePayment";
//import Profile from "../pages/Profile";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const params = useParams();
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-green-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
              <span className="text-white">Refitinco</span>
            </h1>
          </Link>
        </div>

        <div>
          <ul className="hidden md:flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-white hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className=" sm:inline text-white hover:underline ">About</li>
            </Link>
            <Link to="/profile">
              {
                currentUser ? (
                  <div className="">
                    <li className="sm:inline text-white hover:underline">
                      {currentUser.firstname}
                    </li>
                    <Link to="/flutterwave">
                      <li className="m-2 sm:inline text-white hover:underline">
                        Buy
                      </li>
                    </Link>
                    <Link to="/dashboard">
                      <li className="m-2 sm:inline text-white hover:underline">
                        Dashboard
                      </li>
                    </Link>
                  </div>
                ) : (
                  <li className=" sm:inline text-white hover:underline">
                    Sign in
                  </li>
                )
                // &&
                // <Flutterwave />
                // &&
                // <Profile />
              }
            </Link>
          </ul>
        </div>

        {/* Hamburger */}
        <div
          onClick={handleClick}
          className="md:hidden z-10 text-white cursor-pointer"
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </div>

        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-green-900 flex flex-col justify-center items-center"
          }
        >
          <li className="py-6 text-4xl text-white hover:underline">
            <Link onClick={handleClick} to="/">
              Home
            </Link>
          </li>
          <li className="py-6 text-4xl text-white hover:underline">
            <Link onClick={handleClick} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={handleClick} to="/profile">
              {currentUser ? (
                <div className="items-center justify-center">
                  <li className="py-6 text-4xl text-white hover:underline">
                    {currentUser.firstname}
                  </li>
                  {/* <li className="py-6 text-4xl text-white hover:underline">
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li className="py-6 text-4xl text-white hover:underline">
                    <Link to="/flutterwave">Buy</Link>
                  </li>
                  {/* {params.userId && (
      <li className="py-6 text-4xl text-white hover:underline">
        <Link to={`/wallet/${params.userId}`}>Balance</Link>
      </li>
    )} */}
                </div>
              ) : (
                <li className="py-6 text-4xl text-white hover:underline">
                  Sign in
                </li>
              )}

              {/* {
                currentUser ? (
                  <div className="items-center justify-center">
                    <li className="py-6 text-4xl text-white hover:underline">
                      {currentUser.firstname}
                    </li>
                    <li className="py-6 text-4xl text-white hover:underline">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="py-6 text-4xl text-white hover:underline">
                      <Link to="/flutterwave">Buy</Link>
                    </li>
                    <li className="py-6 text-4xl text-white hover:underline">
                      <Link to={`/wallet/${params.userId}`}>Balance</Link>
                    </li>
                    </div>
                ) : (
                  <li className="py-6 text-4xl text-white hover:underline">
                    Sign in
                  </li>
                )
              } */}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
