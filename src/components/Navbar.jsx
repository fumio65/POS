import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import NotificationDropdown from './NotificationDropdown'
import UserDropdown from './UserDropdown'

const navLinks = [
  { to: "/home", icon: "/icons/home-(active).svg", label: "Home" },
  { to: "/products", icon: "/icons/products.svg", label: "Products" },
  { to: "/transactions", icon: "/icons/transactions.svg", label: "Transactions" },
  { to: "/reports", icon: "/icons/reports.svg", label: "Reports" },
];

const lotStock = [
  { to: "/", image: "/images/UN•UW Balloons.png", content: 'Stock for 10" UN&UW Metallic Balloon (Green) is running low! Only 5 items left. Please restock soon!', time: "1 minute ago"},
  { to: "/", image: "/images/UN•UW Balloons.png", content: 'Stock for 10" UN&UW Metallic Balloon (Green) is running low! Only 5 items left. Please restock soon!', time: "1 minute ago"},
];

const noStock = [
  { to: "/", image: "/images/UN•UW Balloons.png", content: 'Stock for 6" UN&UW Metallic Balloon (Green) is out of stock! Please restock immediately.', time: "1 minute ago"},
  { to: "/", image: "/images/UN•UW Balloons.png", content: 'Stock for 6" UN&UW Metallic Balloon (Green) is out of stock! Please restock immediately.', time: "1 minute ago"},
];

const subMenuTeams = [
  { profile: "/images/Lhester.jpg", name: "Lhester Tomenio", role: "Owner" },
  { profile: "/images/img-1.jpg", name: "Ruby Journey", role: "Cashier" },
  { profile: "/images/img-2.jpg", name: "Allyza Nebra", role: "Cashier" },
  { profile: "/images/img-4.jpg", name: "Rena Kane", role: "Manager" },
  { profile: "/images/img-5.jpg", name: "Hermon Dado", role: "Cashier" },
  { profile: "/images/img-6.jpg", name: "Jane Doe", role: "Developer" },
];

const subMenuLinks = [
  { to: "/settings", Label: "Settings" },
  { to: "/logout", Label: "Logout" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);

  useEffect(() => {
    if (!showNotification && notificationActive) {
      const timeout = setTimeout(() => setNotificationActive(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showNotification, notificationActive]);

  useEffect(() => {
    if (!showMenu && menuActive) {
      const timeout = setTimeout(() => setMenuActive(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showMenu, menuActive]);

  return (
    <nav className='relative bg-white flex justify-between h-16 px-4'>
      <Link to="/home" className='flex items-center gap-2 w-max'>
        <img className='h-12' src="/images/logo.png" alt="Logo" />
        <h1 className='w-48 font-bold'>Magsohongnon Balloons & Flowershop</h1>
      </Link>
      <div className='flex gap-6 items-center'>
        <NavLinks navLinks={navLinks} />

        {/* Notification Button */}
        <button
          className={`flex items-center justify-center p-2 w-10 h-10 rounded-lg transition duration-500 ease-in-out
          ${notificationActive ? 'bg-nav-active' : 'hover:bg-nav-hover'}`}
          onClick={() => {
            if (!showNotification) {
              setShowNotification(true);
              setNotificationActive(true);
              setShowMenu(false);
            } else {
              setShowNotification(false);
            }
          }}
          aria-haspopup="true"
          aria-expanded={showNotification}
        >
          <img className='h-6' src="/icons/notification.svg" alt="notification" />
        </button>
        <NotificationDropdown show={showNotification} lotStock={lotStock} noStock={noStock} />

        {/* User Button */}
        <button
          className={`flex items-center px-2 py-1 gap-2 rounded-lg cursor-pointer transition duration-500 ease-in-out ${menuActive ? 'bg-nav-active' : 'hover:bg-nav-hover'}`}
          onClick={() => {
            if (!showMenu) {
              setShowMenu(true);
              setMenuActive(true);
              setShowNotification(false);
            } else {
              setShowMenu(false);
            }
          }}
          aria-haspopup="true"
          aria-expanded={showMenu}
        >
          <div className='flex items-center gap-2'>
            <img className='h-10 rounded-full'
              src="/images/Lhester.jpg" alt="user" />
            <div>
              <h2 className='font-bold'>Lhester Tomenio</h2>
              <p className='flex'>Owner</p>
            </div>
          </div>
          <img className='h-8'
            src="/icons/down-arrow.svg" alt="down-arrow" />
        </button>
        <UserDropdown show={showMenu} subMenuTeams={subMenuTeams} subMenuLinks={subMenuLinks} />
      </div>
    </nav>
  )
}

export default Navbar