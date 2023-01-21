import React, { useState } from 'react';

import { BagIcon, MenuHamburger, SearchIcon } from 'assets/icons';
import { Container } from './styles';
import Sidebar from './Sidebar';

const MobileMenu = ({ options }) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const toggleSidebarIsOpen = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    return (
        <Container>
            <h1 className="header-mobile">KIMOCHISM</h1>
            <div className="nav">
                <span  className="invert" onClick={() => toggleSidebarIsOpen()}>
                    <MenuHamburger />
                </span>
                <div className="actions">
                    <span className="search-icon">
                        <SearchIcon />
                    </span>
                    <span>
                        <BagIcon />
                    </span>
                </div>
            </div>
            {sidebarIsOpen && <Sidebar options={options} handleClose={toggleSidebarIsOpen} />}
        </Container>
    );
};

export default MobileMenu;
