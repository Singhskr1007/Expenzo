import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';
import { toast } from "react-toastify";

const SideMenu = ({ activeMenu, open = false, isMobile = false }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      clearUser();
      localStorage.clear();
      toast.success("Successfully logged out");
      navigate('/login');
    } else {
      navigate(route);
    }
  };

  return (
    <div
      className={`w-64 bg-white h-[calc(100vh-61px)] p-5 border-r border-gray-200 shadow-md
      ${isMobile ? 'lg:hidden fixed top-[61px] left-0 z-50 transition-transform duration-300 ease-in-out'
                 : 'sticky top-[61px] z-20'}
      ${isMobile && (open ? 'translate-x-0' : '-translate-x-full')}
      `}
    >
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        ) : (
          <CharAvatar fullname={user?.fullname} width="w-20" height="h-20" style="text-xl" />
        )}
        <h5 className="text-gray-950 font-medium leading-6">{user?.fullname}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] cursor-pointer py-3 px-6 rounded-lg mb-3
  ${activeMenu === item.label
    ? 'text-white bg-primary'
    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-all duration-200'}
`}

          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
