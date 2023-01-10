import React from 'react';
import { Container } from './styles';

import { useRouter } from 'next/router';

const Product = ({ product }) => {
    const router = useRouter();

    return (
        <Container>
            <span className="box-item-product" onClick={() => router.push(`/product/${product._id}`)}>
                <img
                    src={product.images[0].url}
                    className="box-item-product-image"
                    alt={product.name}
                    width={'100%'}
                    height="300px"
                />
                <span>{product.name}</span>
                <span>R$ {parseFloat(product.price).toFixed(2)}</span>
            </span>
        </Container>
    );
};

export default Product;
