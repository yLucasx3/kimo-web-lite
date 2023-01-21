import React, { useContext } from 'react';
import { Container } from './styles';
import { ModalContext } from 'contexts/ModalContext';
import { BagIcon, CatalogIcon, CollectionsIcon, HomeIcon, UserIcon } from 'assets/icons';
import MobileMenu from './Mobile';
import DesktopMenu from './Desktop';
import SignInUp from 'shared/Modal/SignInUp';
import { AuthContext } from 'contexts/AuthContext';

const Menu = ({ isMobile }: { isMobile?: boolean }) => {
    const { isAuthenticated, firstName } = useContext(AuthContext);

    const options = [
        {
            name: 'home',
            label: 'Home',
            redirectTo: '/',
            showIcon: false,
            icon: HomeIcon,
        },
        {
            name: 'catalog',
            label: 'Catálogo',
            redirectTo: '/catalog',
            showIcon: false,
            icon: CatalogIcon,
        },
        {
            name: 'collections',
            label: 'Coleções',
            redirectTo: '/collections',
            showIcon: false,
            icon: CollectionsIcon,
        },
        {
            name: 'sign in or sign up',
            label: isAuthenticated ? firstName : 'Entre ou cadastre-se',
            redirectTo: '/profile',
            showIcon: true,
            icon: UserIcon,
        },
        {
            name: 'bag',
            label: 'Sacola',
            redirectTo: '/customer-bag',
            showIcon: true,
            icon: BagIcon,
        },
    ];

    const { modal, setModal } = useContext(ModalContext);

    return (
        <Container>
            {isMobile ? <MobileMenu options={options} /> : <DesktopMenu options={options} />}
            <SignInUp
                isOpen={modal.signInUp}
                handleClose={() => setModal({ ...modal, signInUp: false })}
                defaultIsSignIn={true}
            />
        </Container>
    );
};

export default Menu;
