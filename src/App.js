import React, { useState } from "react";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { CSSTransition } from "react-transition-group";

export default function App() {
  const [isAnim, setAnim] = useState(false);
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
}

function NavItem({ icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-btn" onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {/* {open && children} */}
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={500}
        onExited={() => console.log("Exit")}
        classNames="menu-dropdown">
        <div className="menu-dropdown">{children}</div>
      </CSSTransition>
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownMenuItem({ leftIcon, children, rightIcon, goToMenu }) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}>
        <span className="icon-btn">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownMenuItem leftIcon="AD">My Profile</DropdownMenuItem>
          <DropdownMenuItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownMenuItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownMenuItem leftIcon={<ArrowIcon />} goToMenu="main">
            Go Back
          </DropdownMenuItem>
          <DropdownMenuItem leftIcon={<BoltIcon />}>HTML</DropdownMenuItem>
          <DropdownMenuItem leftIcon={<BoltIcon />}>CSS</DropdownMenuItem>
          <DropdownMenuItem leftIcon={<BoltIcon />}>JS</DropdownMenuItem>
          <DropdownMenuItem leftIcon={<BoltIcon />}>Angular</DropdownMenuItem>
          <DropdownMenuItem leftIcon={<BoltIcon />}>React</DropdownMenuItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownMenuItem leftIcon={<ArrowIcon />} goToMenu="main">
            Go Back
          </DropdownMenuItem>
          <DropdownMenuItem leftIcon="🦘">Kangaroo</DropdownMenuItem>
          <DropdownMenuItem leftIcon="🐸">Frog</DropdownMenuItem>
          <DropdownMenuItem leftIcon="🦋">Horse?</DropdownMenuItem>
          <DropdownMenuItem leftIcon="🦔">Hedgehog</DropdownMenuItem>
        </div>
      </CSSTransition>
    </div>
  );
}
