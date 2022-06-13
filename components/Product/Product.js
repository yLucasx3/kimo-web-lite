import React from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Product = ({ product }) => {

	return (
		<Container>
			<div className="box-item-product">
				<Image src={product.images[0].url} className="box-item-product-image" alt="Foto do produto" width={'100%'} height="300px"/>
				<span>{product.name}</span>
				<span>R$ {parseFloat(product.price).toFixed(2)}</span>
			</div>
		</Container>
	);
};

Product.propTypes = {
	product: PropTypes.object.isRequired
};

export default Product;