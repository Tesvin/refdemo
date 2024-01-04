import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard"
import About from "./pages/About";
import { PrivateRoute } from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Buy from "./components/Buy";
import Flutterwave from "./components/Flutterwave";
import Profile from "./pages/Profile";
import Wallet from "./components/Wallet"

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="sign-in" element={<SignIn />}/>
      <Route path="sign-up" element={<SignUp />}/>
      <Route path="about" element={<About />}/>
      <Route path="buy" element={<Buy />}/>
      
      <Route element={<PrivateRoute />}>
        <Route path="Profile" element={<Profile />}/>
        <Route path="dashboard/" element={<Dashboard />}/>
        <Route path="/wallet/:userId" element={<Wallet />}/>
        <Route path="flutterwave" element={<Flutterwave />}/>
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}


