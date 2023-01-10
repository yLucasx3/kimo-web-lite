import React from 'react';
import { Container } from './styles';
import { ArrowIcon } from 'assets/icons';
import { Noproducts } from 'assets/images';
import { useRouter } from 'next/router';

const NoProducts = () => {
    const router = useRouter();

    return (
        <Container>
            <p>Você ainda não tem produtos no carrinho</p>
            <img src={Noproducts} alt="Personagem de Anime" />

            <div className="come-back">
                <span onClick={() => router.push('/catalog')}>
                    <img src={ArrowIcon} alt="Perfil" width="5px" />
                    <span>Ir ás compras</span>
                </span>
            </div>
        </Container>
    );
};

export default NoProducts;
