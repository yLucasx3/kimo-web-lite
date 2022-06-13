import React, { useContext, useState, useEffect } from 'react';
import { Container } from './styles';
import { BagIcon, UserIcon, MenuHamburger, SearchIcon, CatalogIcon, CollectionsIcon, HomeIcon } from '../../assets/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { SignInUp } from '../../shared/Modal/SignInUp';
import Image from 'next/image';

const Menu = () => {

	const { firstName, authenticated } = useContext(AuthContext);

	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();

	const redirectToProfile = () => {

		if (!authenticated) {
			setIsOpen(true);
			return;
		}

		if (authenticated) {
			router.push('/profile/account');
		}
	};
	var mobileV = false;

	function mobile() {
		mobileV = !mobileV;
		if (mobileV) {
			document.getElementById('options-web').style.display = 'flex';
		} else {
			document.getElementById('options-web').style.display = 'none';
		}
	}
	
	useEffect(() => {
		window.addEventListener('resize', function () {
			var largura = window.innerWidth;
			if (largura > 1380) {
				document.getElementById('options-web').style.display = 'flex';
			} else if (largura < 1380) {
				document.getElementById('options-web').style.display = 'none';
			}
		});
	});

	return (
		<Container>
			<div className="logo">
				<Link href="/">
					<h1>KIMOCHISM <span>気持ち</span></h1>
				</Link>
			</div>
			<div className="options-mobile">
				<div className="options-mobile-left">
					<Image src={MenuHamburger} alt="Menu" onClick={mobile} />
				</div>
				<div className="options-mobile-right">
					<Image className="option-search" src={SearchIcon} alt="Search" />
					<Link href="/customerbag">
						<Image src={BagIcon} alt="Sacola" />
					</Link>
				</div>
			</div>
			<div className="options" id="options-web">
				<Link href="/">
					<span className="option-generic">
						<div>Home</div>
						<Image src={HomeIcon} alt="Home" />
					</span>
				</Link>
				<Link href="/catalog">
					<span className="option-generic">
						<div>Catálogo</div>
						<Image src={CatalogIcon} alt="Catalogo" />
					</span>
				</Link>
				<Link href="/collections">
					<span className="option-generic">
						<div>Coleções</div>
						<Image src={CollectionsIcon} alt="Coleções" />
					</span>
				</Link>
				<span className="option-generic opt-desktop" onClick={() => redirectToProfile()}>
					<div>{authenticated ? firstName : 'Entre  ⠀ou⠀ Cadastre-se ⠀'}</div>
					<Image src={UserIcon} alt="Perfil" />
				</span>
				<Link href="/customerbag">
					<span className="option-generic opt-desktop" onClick={() => redirectToProfile()}>
						<div>Sacola</div>
						<Image src={BagIcon} alt="Sacola" />
					</span>
				</Link>
				<SignInUp isOpen={isOpen} defaultIsSignIn={true} handleClose={() => { setIsOpen(false); }} />
			</div>

		</Container>

	);
};

export default Menu;
