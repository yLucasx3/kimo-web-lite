import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import Link from 'next/link';
import api from '../../api';
import Image from 'next/image';

const Gallery = () => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		const { data } = await api.products.list({ limit: 8 });

		setProducts(data);
	};

	const formatPrice = price => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	return (
		<Container>
			<h2>Original Kimochism</h2>
			<div className="gallery-container">
				{/* Items da galeria */}
				{products && products.map(product => {
					return (
						<Link href="/" className="gallery-box"  key={product._id}>
							<Image src={product.images[0].url} alt="Produto" width={'300px'} height={'300px'}/>
							{/* <div className="gallery-box-title">
								<label>{product.name}</label>
								<span>
									<i>{formatPrice(product.price)}</i>- {formatPrice(product.discount_price)}
									<b>Save {formatPrice(product.discount_price)}</b>
								</span>
							</div> */}
						</Link>
					);
				})}
			</div>
			<Link href="/catalog">
				<button>Ver mais</button>
			</Link>
		</Container>
	);
};

export default Gallery;