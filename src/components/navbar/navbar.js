import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa'; 
import "./navbar.css"

const Navbar = () => {

    const [shadow, setShadow] = useState("0 5px 10px rgba(0, 0, 0, 0.1)");
    const [activeLink, setActiveLink] = useState('');
  
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName); 
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.nav')) {
                // Do nothing, keep the active state
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="nav"
        style={{ boxShadow: shadow }}
        onMouseEnter={() => setShadow("0 10px 20px rgba(0, 0, 0, 0.2)")}
        onMouseLeave={() => setShadow("0 5px 10px rgba(0, 0, 0, 0.1)")}>
            <div className="nav-content" >
                <ul className="ul">
                <li>
                        <Link
                            to="/food/menu"
                            className={`link ${activeLink === 'menu' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('menu')}
                        >
                            <FaBars className="icons"/> Menu  
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/food/add"
                            className={`link ${activeLink === 'cart' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('cart')}
                        >
                            <FaShoppingCart className="icons"/> Cart  
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/customer/profile"
                            className={`link ${activeLink === 'profile' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('profile')}
                        >
                            <FaUserCircle className="icons"/> Profile 
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
