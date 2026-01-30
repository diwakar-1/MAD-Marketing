import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import api from "../configs/axios"; // axios instance
import toast from "react-hot-toast";

export default function Navbar() {
  const { openSignIn, openSignUp } = useClerk();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [madPoints, setMadPoints] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Create AD", href: "/create_ad" },
    { name: "Layouts", href: "/layouts" },
    { name: "Pricing", href: "/pricing" },
  ];

  /* ---------------- FETCH USER CREDITS ---------------- */
  const getUserCredits = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/user/credits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMadPoints(data.Madpoints);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load MAD points");
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getUserCredits();
    }
  }, [isSignedIn, pathname]);

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-lg border-b border-white/10"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="MAD"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* CENTER LINKS */}
          <div className="hidden md:flex justify-center gap-8 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/80 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT AUTH */}
          <div className="hidden md:flex justify-end items-center gap-4">
            <SignedOut>
              <button
                onClick={openSignIn}
                className="text-sm text-white/80 hover:text-white"
              >
                Sign in
              </button>
              <button
                onClick={openSignUp}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm text-white"
              >
                Sign up
              </button>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/pricing")}
                  className="px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/30 transition"
                >
                  MAD Points: <span className="font-semibold">{madPoints}</span>
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden justify-self-end text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-xl
        flex flex-col items-center justify-center gap-6 text-lg
        transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-400 transition"
          >
            {link.name}
          </Link>
        ))}

        <SignedOut>
          <button onClick={openSignIn} className="text-white">
            Sign in
          </button>
          <button
            onClick={openSignUp}
            className="px-6 py-2 rounded-full bg-white/10 text-white"
          >
            Sign up
          </button>
        </SignedOut>

        <SignedIn>
          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-2 rounded-full bg-red-500/20 text-red-400"
          >
            MAD Points: {madPoints}
          </button>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
