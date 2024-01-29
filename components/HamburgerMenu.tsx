// HamburgerMenu.jsx
import React, { useState } from 'react';
import {Button} from "@/components/ui/button";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <Button onClick={toggleMenu}>
        <HamburgerMenuIcon />
      </Button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          {/* Add your menu items and styles here */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <ul>
              <li className="my-2">Menu Item 1</li>
              <li className="my-2">Menu Item 2</li>
              {/* Add more menu items as needed */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
