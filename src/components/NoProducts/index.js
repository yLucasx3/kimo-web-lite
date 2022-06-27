import React from 'react';
import { Container } from './styles';
import Link from 'next/link';
import { ArrowIcon } from 'assets/icons';
import { Noproducts } from 'assets/images';
import Image from 'next/image';

const NoProducts = () => {
	return (
		<Container>
			<p>Você ainda não tem produtos no carrinho</p>
			<Image src={Noproducts} alt="Personagem de Anime" />

			<div className="come-back">
				<Link href="/catalog">
					<Image src={ArrowIcon} alt="Perfil" width="5px" />
					<span>Ir ás compras</span>
				</Link>
			</div>
		</Container>
	);
};

export default NoProducts;