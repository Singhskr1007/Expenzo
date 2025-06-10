import React from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeMenu, toggleMenu, openSideMenu }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard'); // Change the path if your dashboard route is different
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <button className="lg:hidden text-black" onClick={toggleMenu}>
        {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
      </button>

      {/* Logo/Title as clickable button */}
      <button
        onClick={handleLogoClick}
        className="text-lg font-semibold text-black focus:outline-none cursor-pointer"
      >
        Expenzo
      </button>
    </div>
  );
};

export default Navbar;
