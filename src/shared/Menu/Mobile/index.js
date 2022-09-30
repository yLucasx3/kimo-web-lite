import React, { useState } from 'react';
import Image from 'next/image';
import { BagIcon, MenuHamburger, SearchIcon } from 'assets/icons';
import { Container } from './styles';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const MobileMenu = ({ options }) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const toggleSidebarIsOpen = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    return (
        <Container>
            <h1 className="header-mobile">KIMOCHISM</h1>
            <div className="nav">
                <Image
                    src={MenuHamburger}
                    alt="Abrir ou fechar menu"
                    className="invert"
                    onClick={() => toggleSidebarIsOpen()}
                    width={'24px'}
                    height={'24px'}
                />
                <div className="actions">
                    <span className="search-icon">
                        <Image src={SearchIcon} alt="Pesquisar" width={'20px'} />
                    </span>
                    <span>
                        <Image src={BagIcon} alt="Sacola" width={'20px'} className="invert" />
                    </span>
                </div>
            </div>
            {sidebarIsOpen && <Sidebar options={options} handleClose={toggleSidebarIsOpen} />}
        </Container>
    );
};

MobileMenu.propTypes = {
    options: PropTypes.array.isRequired,
};

export default MobileMenu;
