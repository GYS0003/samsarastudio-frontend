'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdMiscellaneousServices, MdDashboard, MdLibraryBooks } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaBriefcase, FaBars, FaUsers, FaCogs, FaSignOutAlt, FaClock, FaImage } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiFillAppstore } from 'react-icons/ai';
import { RiGalleryFill } from 'react-icons/ri';
import { BiTestTube } from 'react-icons/bi'; // For Testimonials
import { GiTechnoHeart } from 'react-icons/gi'; // For Services & Technologies

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('Token');
    router.push('/');
  };

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navItems = [
    {
      name: 'Dashboard',
      icon: <MdDashboard />,
      route: '/adminsamsarastudio/dashboard',
    },
    {
      name: 'Careers',
      icon: <FaBriefcase />,
      route: '/adminsamsarastudio/careers',
      subRoutes: [
        {
          name: 'Applications',
          route: '/adminsamsarastudio/careers/job-applications',
        },
        {
          name: 'Job List',
          route: '/adminsamsarastudio/careers/job-list',
        },
      ],
    },
    {
      name: 'Meetings',
      icon: <FaClock />,
      route: '/adminsamsarastudio/bookmeeting',
      subRoutes: [
        {
          name: 'Meeting Scheduled',
          route: '/adminsamsarastudio/bookmeeting/meeting-sheduled',
        },
        {
          name: 'Block Time',
          route: '/adminsamsarastudio/bookmeeting/block-time',
        },
      ],
    },
    {
      name: 'Testimonials',
      icon: <BiTestTube />,
      route: '/adminsamsarastudio/testimonials',
    },
    {
      name: 'Blog',
      icon: <MdLibraryBooks />, // Changed from BiTestTube to MdLibraryBooks
      route: '/adminsamsarastudio/blog',
    },
    // {
    //   name: 'Team Members',
    //   icon: <HiOutlineUserGroup />,
    //   route: '/adminsamsarastudio/our-team',
    // },
    {
      name: 'Services & Technologies',
      icon: <MdMiscellaneousServices />,
      route: '/adminsamsarastudio/our-services',
    },
    {
      name: 'Gallery',
      icon: <RiGalleryFill />,
      route: '/adminsamsarastudio/gallery',
    },
    {
      name: 'Portfolio',
      icon: <FaImage />, // Changed from RiGalleryFill to FaImage
      route: '/adminsamsarastudio/portfolio',
    },
    {
      name: 'Settings',
      icon: <FaCogs />,
      route: '/adminsamsarastudio/settings',
    },
    {
      name: 'Logout',
      icon: <FaSignOutAlt />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex h-screen relative z-10 overflow-hidden bg-gray-100 dark:bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-700 h-full mt-16 p-4 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'
          }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none mb-6"
        >
          <FaBars size={20} />
        </button>

        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname.startsWith(item.route || '');
            const hasSubRoutes = item.subRoutes?.length > 0;
            const isOpen = openMenus[item.name];

            return (
              <li key={index}>
                {hasSubRoutes ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center gap-3 w-full p-2 rounded-md hover:bg-purple-800 transition ${isActive ? 'bg-purple-800 font-bold' : ''
                        }`}
                    >
                      {item.icon}
                      {sidebarOpen && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </>
                      )}
                    </button>

                    {/* Submenu */}
                    {isOpen && sidebarOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subRoutes.map((sub, idx) => (
                          <li key={idx}>
                            <Link
                              href={sub.route}
                              className={`block text-sm p-2 rounded-md hover:bg-purple-800 transition ${pathname === sub.route ? 'bg-purple-800 font-bold' : ''
                                }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-purple-800 transition"
                  >
                    {item.icon}
                    {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.route}
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-purple-800 transition ${pathname === item.route ? 'bg-purple-800 font-bold' : ''
                      }`}
                  >
                    {item.icon}
                    {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;