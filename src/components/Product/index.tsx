import React from 'react';
import { Container } from './styles';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Product = ({ product }) => {
    const router = useRouter();

    return (
        <Container>
            <span className="box-item-product" onClick={() => router.push(`/product/${product._id}`)}>
                <Image
                    src={product.images[0].url}
                    className="box-item-product-image"
                    alt={product.name}
                    width={300}
                    height={300}
                    priority
                />
                <span>{product.name}</span>
                <span>R$ {parseFloat(product.price).toFixed(2)}</span>
            </span>
        </Container>
    );
};

export default Product;
