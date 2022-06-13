import React from 'react';
import { Container } from './styles';
import { Menu } from 'shared/Menu';
import { Warning } from 'components/Warning';
import { Banner } from 'components/Banner';
import { Gallery } from 'components/Gallery';
import { Footer } from 'shared/Footer';
import { Newsletter } from 'shared/Newsletter';

const Home = () => {
	return (
		<Container>
			<Menu />
			<Warning message="Cupom de R$20 OFF em todo site! Utilize o cupom: KIMOOFF" />
			<Banner />
			<Gallery />
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default Home;
