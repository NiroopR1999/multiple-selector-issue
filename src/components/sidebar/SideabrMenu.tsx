'use client'
// SidebarMenu.tsx
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Link from 'next/link'


interface Route {
  icon: JSX.Element;
  name: string;
  path: string;
  subRoutes?: Route[];
}

interface SidebarMenuProps {
  route: Route;
  showAnimation: Variants;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>{' '}
   <AnimatePresence>
  {isMenuOpen && route.subRoutes && (
    <motion.div
      variants={menuAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="menu_container"
    >
      {route.subRoutes.map((subRoute, i) => (
        <motion.div variants={menuItemAnimation} key={i} custom={i}>
          <Link href={subRoute.path} className="link">
            <div className="icon">{subRoute.icon}</div>
            <motion.div className="link_text">{subRoute.name}</motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
};

export default SidebarMenu;

