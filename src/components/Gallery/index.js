import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Gallery = ({ products }) => {
	const router = useRouter();

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
				{products && products.map(product => {
					return (
						<span className="gallery-box"  key={product._id} onClick={() => router.push(`/product/${product._id}`)}>
							<Image src={product.images[0].url} alt="Produto" width={'300px'} height={'300px'}/>
							<div className="gallery-box-title">
								<label>{product.name}</label>
								<span>
									<i>{formatPrice(product.price)}</i>- {formatPrice(product.discount_price)}
									<b>Save {formatPrice(product.discount_price)}</b>
								</span>
							</div>
						</span>
					);
				})}
			</div>
			<Link href="/catalog">
				<button>Ver mais</button>
			</Link>
		</Container>
	);
};

Gallery.propTypes = {
	products: PropTypes.array.isRequired
};

export default Gallery;