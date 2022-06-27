import React, { useContext, useEffect, useState } from 'react';
import { ArrowIcon } from 'assets/icons';
import { Container } from 'styles/pages/profile/profile.styles';
import Account from './account';
import Address from './address';
// import AddressView from './Address/AddressView/AddressView';
import { Warning } from 'components';
import { AuthContext } from 'contexts/AuthContext';
import Image from 'next/image';

import { Router, useRouter } from 'next/router';

import { Menu, Footer, Newsletter } from 'shared';

import { getAPIClient } from 'config/axios';
import { parseCookies } from 'nookies';

const Profile = () => {

	const { handleLogout } = useContext(AuthContext);

	const router = useRouter();
	const params = router.query;

	const options = [
		{ name: 'account', label: 'Conta', show: true },
		{ name: 'address', label: 'Endereços', show: true },
		{ name: 'orders', label: 'Pedidos', show: true },
		{ name: 'create-address', label: 'Criando Endereço', show: false },
	];

	const [currentOption, setCurrentOption] = useState(options[0].name);
	const [addressToEdit, setAddressToEdit] = useState({});

	useEffect(() => {

		

		options.map(opt => {
			if(opt.name === params.option){
				setCurrentOption(opt.name);
			}
		});
	}, []);

	return (
		<>
			<Container>
				<Menu />
				<Warning message="Cupom de R$20 OFF em todo site! Utilize o cupom: KIMOOFF" />
				<div className="container-profile">
					<div className="profile-left">
						<div className="profile-btn-option">
							{options.filter(option => option.show).map(option => {
								return <button key={option.name} onClick={() => {setCurrentOption(option.name); router.push(`/profile/${option.name}`);}}>
									<span>{option.label}</span>
									<Image src={ArrowIcon} alt={option.label} />
								</button>;
							})}
							{/* <button>
								<span>Conta</span>
								<img src={ArrowIcon} />
							</button>
							<button>
								<span>Endereços</span>
								<img src={ArrowIcon} />
							</button> */}
							{/* <button>
									<span>Notificações</span>
									<img src={ArrowIcon} />
								</button> */}
							{/* <button>
									<span>Privacidade</span>
									<img src={ArrowIcon} />
								</button> */}
							{/* <button>
									<span>Suporte</span>
									<img src={ArrowIcon} />
								</button> */}
							{/* <button>
									<span>Sobre</span>
									<img src={ArrowIcon} />
								</button> */}
							<button onClick={() => { handleLogout(); router.push('/'); }}>
								<span>Sair</span>
								<Image src={ArrowIcon} alt=""/>
							</button>
						</div>
					</div>
					<div className="profile-right">
						{currentOption === options[0].name && <Account />}
						{currentOption === options[1].name && 
							<Address
								handleCreateAddress={() => setCurrentOption(options[3].name)}
								handleEditAddress={address => {setCurrentOption(options[3].name); setAddressToEdit(address);}}
							/>
						}
						{/* { currentOption === options[2].name && <Orders /> } */}
						{/* {currentOption === options[3].name && <AddressView goBack={() => setCurrentOption(options[1].name)} addressToEdit={addressToEdit}/>} */}
					</div>
				</div>
				<Newsletter/>
				<Footer />
			</Container>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const apiClient = getAPIClient(ctx);

  const { ['kimochism.token']: token } = parseCookies(ctx);

	if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

	return { 
		props: {}
	};
};

export default Profile;
