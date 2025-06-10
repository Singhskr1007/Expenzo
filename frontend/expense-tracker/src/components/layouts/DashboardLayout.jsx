import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { UserContext } from '../../context/UserContext';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleMenu = () => {
    setOpenSideMenu(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} toggleMenu={toggleMenu} openSideMenu={openSideMenu} />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Mobile Sidebar */}
        <SideMenu activeMenu={activeMenu} open={openSideMenu} isMobile={true} />

        <div className="flex-1 px-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
