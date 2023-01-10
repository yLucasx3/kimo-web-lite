/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Container } from 'styles/pages/customer-bag.styles';
import { useRouter } from 'next/router';
import { MapPinIcon, ArrowIcon, BagIcon } from 'assets/icons';
import { AuthContext } from 'contexts/AuthContext';
import { NoProducts, Payment } from 'components';
import { Menu, Footer, AddressSelector, SignInUp } from 'shared';
import { LS_KEY_CUSTOMER_BAG, LS_KEY_USER } from 'constants/all';
import {
    UPDATE_CUSTOMER_BAGS,
    ADD_CUSTOMER_BAG,
    SET_CUSTOMER_BAGS_STORED,
    REMOVE_CUSTOMER_BAG,
    SET_CUSTOMER_BAGS,
} from 'constants/types';
import * as ls from 'utils/localStorage';
import api from 'api';

import { parseCookies } from 'nookies';
import { getAPIClient } from 'config/axios';

// const initialState = {
// 	customerBags: [],
// 	customerBagsStored: [],
// };

// const reducer = (state, { type, payload }) => {
// 	switch (type) {
// 		case ADD_CUSTOMER_BAG:
// 			return { ...state, customerBags: [...state.customerBags, payload] };
// 		case REMOVE_CUSTOMER_BAG:
// 			return { ...state, customerBags: payload };
// 		case UPDATE_CUSTOMER_BAGS:
// 			return { ...state, customerBags: payload };
// 		case SET_CUSTOMER_BAGS:
// 			return { ...state, customerBags: payload };
// 		case SET_CUSTOMER_BAGS_STORED:
// 			return { ...state, customerBagsStored: payload };
// 		default:
// 			return state;
// 	}
// };

const CustomerBag = ({ customerBags, mainAddress, freight }) => {
    console.log(customerBags);
    console.log(mainAddress);
    console.log(freight);

    const { isAuthenticated } = useContext(AuthContext);
    const { 'kimochism.user.email': email } = parseCookies();

    const router = useRouter();

    // const [state, dispatch] = useReducer(reducer, initialState);

    // const [allowUpdate, setAllowUpdate] = useState(true);
    // const [customerBagsStoraged,] = useState(ls.getItem(LS_KEY_CUSTOMER_BAG, 'customerBags') || []);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productsAmount, setProductsAmount] = useState(0);
    // const [freight, setFreight] = useState(0);
    // const [mainAddress, setMainAddress] = useState();
    const [addressSelectorIsOpen, setAddressSelectorIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddres] = useState();
    const [showSignInUp, setShowSignInUp] = useState(false);

    // const {
    // 	customerBags,
    // 	customerBagsStored
    // } = state;

    // useEffect(() => {
    // 	const customerBagsStored = ls.getItem(LS_KEY_CUSTOMER_BAG, 'customerBags') || [];
    // 	dispatch({ type: SET_CUSTOMER_BAGS_STORED, payload: customerBagsStored });
    // }, []);

    // useEffect(() => {
    // 	if (isAuthenticated) return getCustomerBags();
    // }, []);

    // useEffect(() => {
    // 	if (customerBagsStored.length && !isAuthenticated) return getCustomerBagsStored();
    // }, [customerBagsStored]);

    // useEffect(() => {
    // 	if (customerBagsStoraged) {
    // 		ls.storeItem(LS_KEY_CUSTOMER_BAG, { customerBags: customerBagsStored });
    // 	}
    // }, [customerBagsStored]);

    // useEffect(() => {
    // 	setTotalAmount(parseFloat(productsAmount) + parseFloat(freight));
    // 	calculateProductsAmount(customerBags);
    // }, [customerBags, productsAmount, freight]);

    // const getCustomerBagsStored = async () => {
    // 	if (allowUpdate) {
    // 		customerBagsStored.map(async ({ id, options, quantity, productId }) => {

    // 			const { name, images, price } = await api.products.show(productId);

    // 			const customerBagToAdd = {
    // 				id,
    // 				options,
    // 				quantity,
    // 				product: {
    // 					id: productId,
    // 					name,
    // 					firstImage: images[0].url,
    // 					price
    // 				}
    // 			};

    // 			dispatch({ type: ADD_CUSTOMER_BAG, payload: customerBagToAdd });
    // 		});
    // 	}
    // };

    const getCustomerBags = async () => {
        const customerBags = await api.customerBags.listByEmail(email);

        const customerBagsMap = customerBags.map(
            ({ _id: id, options, quantity, product: { _id: productId, name, images, price } }) => ({
                id,
                options,
                quantity,
                product: {
                    id: productId,
                    name,
                    firstImage: images[0].url,
                    price,
                },
            }),
        );

        // dispatch({ type: SET_CUSTOMER_BAGS, payload: customerBagsMap });
        calculateProductsAmount(customerBagsMap);
    };

    const calculateProductsAmount = customerBags => {
        setTotalAmount(parseFloat(productsAmount) + parseFloat(freight));
        setProductsAmount(
            customerBags.reduce((accumulator, current) => {
                accumulator += parseFloat(current.product.price) * current.quantity;
                return accumulator;
            }, 0),
        );
    };

    // const changeQuantityStored = async (id, quantity) => {
    // 	const customerBagsStoredMap = customerBags => customerBags.map(({ id, quantity, options, product }) => ({ id, quantity, options, productId: product.id }));

    // 	setAllowUpdate(false);

    // 	if (!quantity) {
    // 		const filteredCustomerBags = customerBags.filter(customerBag => customerBag.id !== id);

    // 		dispatch({ type: REMOVE_CUSTOMER_BAG, payload: filteredCustomerBags });
    // 		dispatch({ type: SET_CUSTOMER_BAGS_STORED, payload: customerBagsStoredMap(filteredCustomerBags) });

    // 		return;
    // 	}

    // 	const customerBagUpdated = customerBags.map(customerBag => customerBag.id === id ? { ...customerBag, quantity } : customerBag);

    // 	dispatch({ type: UPDATE_CUSTOMER_BAGS, payload: customerBagUpdated });
    // 	dispatch({ type: SET_CUSTOMER_BAGS_STORED, payload: customerBagsStoredMap(customerBagUpdated) });
    // };

    const changeQuantity = async (id, quantity) => {
        if (!quantity) {
            await api.customerBags.destroy(id);
            await getCustomerBags();
            return;
        }

        await api.customerBags.update(id, { quantity });
        await getCustomerBags();
    };

    // const getMainAddress = async () => {
    // 	await api.users.showByEmail(email).then(async user => {
    // 		await api.customers.showByUser(user._id).then(async customer => {
    // 			await api.addresses.listByCustomer(customer._id).then(addresses => {
    // 				if (addresses && addresses.length) {
    // 					setMainAddress(addresses[0]);
    // 					calculateZipCode(addresses[0].zip_code);
    // 				}
    // 			});
    // 		});
    // 	});
    // };

    const calculateZipCode = async zipCode => {
        const data = {
            sCepOrigem: '08150020',
            sCepDestino: zipCode,
            nVlPeso: '0.2',
            nCdFormato: '1',
            nVlComprimento: '15',
            nVlAltura: '5',
            nVlLargura: '15',
            nCdServico: ['40010'],
            nVlDiametro: '0',
        };

        const response = await api.freights.store(data);

        if (response[0].Valor) {
            setFreight(response[0].Valor);
        }
    };

    if (!customerBags.length)
        return (
            <>
                <Menu />
                <NoProducts />
                <Footer />
            </>
        );

    return (
        <Container>
            {customerBags.length && (
                <>
                    <div className="customer-bag-left">
                        <div className="logo">
                            <span onClick={() => router.push('/')}>
                                <h1>
                                    KIMOCHISM <span>気持ち</span>
                                </h1>
                            </span>
                        </div>
                        <div className="customer-bag-container-infos">
                            <div className="customer-address">
                                {mainAddress && (
                                    <>
                                        <span>Entregar em</span>
                                        <span>
                                            <img
                                                className="pin"
                                                src={MapPinIcon}
                                                alt="Localização"
                                                width="18px"
                                                height={'18px'}
                                            />
                                            &nbsp;{mainAddress.street}, {mainAddress.number}, {mainAddress.city} -{' '}
                                            {mainAddress.state}
                                        </span>
                                        <span onClick={() => setAddressSelectorIsOpen(true)}>
                                            Usar outro endereço &nbsp;
                                            <img src={ArrowIcon} alt="Perfil" width="18px" height={'18px'} />
                                        </span>
                                    </>
                                )}
                                {selectedAddress && (
                                    <>
                                        <span>Entregar em</span>
                                        <span>
                                            <img
                                                className="pin"
                                                src={MapPinIcon}
                                                alt="Localização"
                                                width="18px"
                                                height={'18px'}
                                            />
                                            &nbsp;{selectedAddress.street}, {selectedAddress.number},{' '}
                                            {selectedAddress.city} - {selectedAddress.state}
                                        </span>
                                        <span onClick={() => setAddressSelectorIsOpen(true)}>
                                            Usar outro endereço &nbsp;
                                            <img src={ArrowIcon} alt="Perfil" width="18px" height={'18px'} />
                                        </span>
                                    </>
                                )}
                                {!mainAddress && !selectedAddress && (
                                    <span
                                        className="create-address"
                                        onClick={() =>
                                            !isAuthenticated
                                                ? setShowSignInUp(true)
                                                : router.push('profile/create-address/return')
                                        }
                                    >
                                        Criar endereço
                                    </span>
                                )}
                            </div>

                            <div className="customer-payment-options">
                                <Payment orderAmount={totalAmount} description="Produtos" />
                            </div>

                            <div className="come-back">
                                <span onClick={() => router.push('/catalog')}>
                                    <img src={ArrowIcon} alt="Perfil" width="18px" height={'18px'} />
                                    <span>Continuar comprando</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="customer-bag-right">
                        <div className="header-products">
                            <img src={BagIcon} alt="" width="18px" height={'18px'} />
                            <span>Sua sacola</span>
                        </div>

                        {/* lista de produtos */}
                        <div className="list-products">
                            {customerBags &&
                                customerBags.map(customerBag => {
                                    return (
                                        <div className="product-item" key={customerBag.id}>
                                            <img
                                                src={customerBag.product.firstImage}
                                                alt=""
                                                width="18px"
                                                height={'18px'}
                                            />
                                            <div className="product-info">
                                                <span>{customerBag.product.name}</span>
                                                <span>Tamanho: {customerBag.options.size}</span>
                                                <span>Cor: {customerBag.options.color.label}</span>
                                                <div className="quantity-products">
                                                    <div>
                                                        <span>Quantidade:</span>
                                                    </div>
                                                    <div className="quantity-buttons">
                                                        <button
                                                            onClick={() => {
                                                                if (!isAuthenticated)
                                                                    return changeQuantityStored(
                                                                        customerBag.id,
                                                                        customerBag.quantity - 1,
                                                                    );
                                                                return changeQuantity(
                                                                    customerBag.id,
                                                                    customerBag.quantity - 1,
                                                                );
                                                            }}
                                                        >
                                                            {' '}
                                                            -{' '}
                                                        </button>
                                                        <label> {customerBag.quantity} </label>
                                                        <button
                                                            onClick={() => {
                                                                if (!isAuthenticated)
                                                                    return changeQuantityStored(
                                                                        customerBag.id,
                                                                        customerBag.quantity + 1,
                                                                    );
                                                                return changeQuantity(
                                                                    customerBag.id,
                                                                    customerBag.quantity + 1,
                                                                );
                                                            }}
                                                        >
                                                            {' '}
                                                            +{' '}
                                                        </button>
                                                    </div>
                                                </div>
                                                <span>
                                                    Preço Unidade: R$ {parseFloat(customerBag.product.price).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        {/* lista de produtos */}

                        <div className="checkout-products">
                            <div>
                                <span>Total:</span>
                                <span>R$ {parseFloat(totalAmount).toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Produtos:</span>
                                <span>R$ {parseFloat(productsAmount).toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Frete:</span>
                                <span>R$ {parseFloat(freight).toFixed(2)}</span>
                            </div>
                            {/* <button>Finalizar</button> */}
                        </div>
                    </div>
                    {isAuthenticated && (
                        <AddressSelector
                            isOpen={addressSelectorIsOpen}
                            handleClose={() => setAddressSelectorIsOpen(false)}
                            onSelected={address => {
                                setSelectedAddres(address);
                                calculateZipCode(address.zip_code);
                            }}
                        />
                    )}
                </>
            )}
            {<SignInUp isOpen={showSignInUp} handleClose={() => setShowSignInUp(false)} defaultIsSignIn />}
        </Container>
    );
};

export const getServerSideProps = async context => {
    const { 'kimochism.user.email': email, 'kimochism.customer.id': customerId } = parseCookies(context);

    const customerBags = await api.customerBags.listByEmail(email, context).catch(error => console.log(error));

    const customerBagsMapped =
        customerBags &&
        customerBags.map(customerBag => {
            const { product } = customerBag;

            return {
                id: customerBag._id,
                options: customerBag.options,
                quantity: customerBag.quantity,
                product: {
                    id: product._id,
                    name: product.name,
                    firstImage: product.images[0].url,
                    price: product.price,
                },
            };
        });

    const [mainAddress] = await api.addresses.listByCustomer(customerId, context);

    let freight = 0;

    const calculateZipCode = async zipCode => {
        const data = {
            sCepOrigem: '08150020',
            sCepDestino: zipCode,
            nVlPeso: '0.2',
            nCdFormato: '1',
            nVlComprimento: '15',
            nVlAltura: '5',
            nVlLargura: '15',
            nCdServico: ['40010'],
            nVlDiametro: '0',
        };

        const [freight] = await api.freights.store(data, context);

        console.log(freight);

        if (freight.Valor) {
            return freight.Valor;
        }

        return 0;
    };

    freight = mainAddress && (await calculateZipCode(mainAddress.zip_code));

    return {
        props: {
            customerBags: customerBagsMapped || [],
            mainAddress: mainAddress || {},
            freight: freight || 0,
        },
    };
};

export default CustomerBag;
