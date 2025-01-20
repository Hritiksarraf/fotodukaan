"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const [admin, setAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const [order, setOrder] = useState("Orders"); // Default dropdown display
  const [isOpen, setIsOpen] = useState(false); // For dropdown menu
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      if (decodedUser?.isAdmin) {
        setAdmin(decodedUser?.isAdmin);
      }
    }
  }, []);

  const handleOrderChange = (key, displayName) => {
    setOrder(displayName); // Update display name
    setIsOpen(false);
    if (key === "orders") {
      router.push("/orders");
    } else {
      router.push(`/orders/${key}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/adminlogin");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={admin ? "/freelancers" : "/"}>
            <img
              src="https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png"
              width={150}
              height={50}
              alt="fotodukaan logo"
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
            />
          </svg>
        </button>

        {/* Links and Buttons */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white shadow-md md:static md:block md:w-auto md:shadow-none`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-4 md:p-0">
            {/* Center Links */}
            {admin && (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Link
                  href="/dashboard/freelancer"
                  className="text-blue-600 hover:text-gray-400"
                >
                  Freelancers
                </Link>
                <Link
                  href="/users"
                  className="text-blue-600 hover:text-gray-400"
                >
                  Users
                </Link>

                {/* Dropdown Menu for Orders */}
                <div
                  className="relative text-blue-600 font-bold btn-select hover:text-gray-400 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
                >
                  {order}
                  {isOpen && (
                    <div className="absolute bg-white border w-80 rounded-md shadow-md mt-2 z-10">
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOrderChange("orders", "New Orders")}
                      >
                        New Orders
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleOrderChange("usercancel", "Canceled by User")
                        }
                      >
                        Canceled by User
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleOrderChange("freelancercancel", "Canceled by Freelancer")
                        }
                      >
                        Canceled by Freelancer
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleOrderChange("notapproved", "Work Started")
                        }
                      >
                        Work Not Started
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleOrderChange("freelancerapprove", "Work Not Started")
                        }
                      >
                        Work Started
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleOrderChange("adminapprove", "Old Orders")
                        }
                      >
                        Old Orders
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Login/Logout Button */}
            <button
              onClick={handleLogout}
              className="py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full"
            >
              {admin ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
