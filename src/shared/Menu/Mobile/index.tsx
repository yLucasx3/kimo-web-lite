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
                <img
                    src={MenuHamburger}
                    alt="Abrir ou fechar menu"
                    className="invert"
                    onClick={() => toggleSidebarIsOpen()}
                    width={'24px'}
                    height={'24px'}
                />
                <div className="actions">
                    <span className="search-icon">
                        <img src={SearchIcon} alt="Pesquisar" width={'20px'} />
                    </span>
                    <span>
                        <img src={BagIcon} alt="Sacola" width={'20px'} className="invert" />
                    </span>
                </div>
            </div>
            {sidebarIsOpen && <Sidebar options={options} handleClose={toggleSidebarIsOpen} />}
        </Container>
    );
};

export default MobileMenu;
