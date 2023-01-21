import React, { useEffect, useState } from 'react';
import { Container } from 'styles/pages/catalog.styles';
import { Menu, Footer, Newsletter } from 'shared';
import { Filter, Product, Warning } from 'components';
import api from 'api';

interface CatalogProps {
    initialProducts: any,
    initialOptions: any,
    availablePages: any
}

const Catalog = ({ initialProducts, initialOptions, availablePages }: CatalogProps) => {
    const [products, setProducts] = useState(initialProducts);
    const [options, setOptions] = useState(initialOptions);
    const [filters, setFilters] = useState({});

    // useEffect(() => {
    //     refetchProducts();
    // }, [options]);

    const refetchProducts = async () => {
        const { data } = await api.products.list(options);

        setProducts(data);
    };

    useEffect(() => {
        if (Object.keys(filters).length) {
        }
    }, [filters]);

    const getFilters = async filters => {
        setFilters(filters);
    };

    const buttonPages = () => {
        let buttons = [];
        let pages = availablePages % 2 !== 0 ? parseInt(availablePages + 1) : availablePages;

        for (let i = 1; i <= pages; i++) {
            buttons.push(
                <button
                    key={i}
                    style={i === 1 ? { color: 'white', background: 'black' } : {}}
                    onClick={e => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });

                        // removing style before adding in selected button
                        const allButtons = document.querySelector('.pages-buttons');

                        allButtons.childNodes.forEach(button => {
                            // @ts-ignore
                            button.style.background = 'white';
                            // @ts-ignore
                            button.style.color = 'black';
                        });

                        setOptions({
                            ...options,
                            offset: options.limit * (i - 1),
                        });

                        e.currentTarget.style.background = 'black';
                        e.currentTarget.style.color = 'white';
                    }}
                >
                    {i}
                </button>,
            );
        }

        return buttons;
    };

    return (
        <Container>
            <Menu />
            <Warning message="Cupom de R$20 OFF em todo site! Utilize o cupom: KIMOOFF" />
            <div className="container-catalog">
                <div className="container-catalog-left">
                    <Filter handleGetFilters={filters => getFilters(filters)} />
                </div>
                <div className="aux-cont">
                    <h1 className="title-catalog">Catálogo</h1>
                    <div className="container-catalog-right">
                        {products &&
                            products.map((product: any) => {
                                return <Product product={product} key={product._id} />;
                            })}
                    </div>
                    <div className="pages-buttons">{buttonPages()}</div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export const getServerSideProps = async ({ query }) => {
    let options = {
        offset: 0,
        limit: 8,
        total: 0,
    };

    if (query.options) options = query.options;

    const { products, total } = await api.products.list(options);

    let availablePages = 0;

    if (options.total !== total) {
        options = { ...options, total };
    }

    availablePages = options.total / options.limit;

    return {
        props: {
            initialProducts: products,
            initialOptions: options,
            availablePages,
        },
    };
};

export default Catalog;
