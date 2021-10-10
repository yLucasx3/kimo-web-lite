import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import { MapPinIcon, ArrowIcon, BarcodeIcon, PixIcon, MasterCardIcon, TruckIcon, BagIcon } from 'assets/icons';
import { CustomerBagService } from 'services/CustomerBagService';

const CustomerBag = () => {

	const customerBagService = new CustomerBagService();
	const email = localStorage.getItem('email');

	const [customerBags, setCustomerBags] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [productsAmount, setProductsAmount] = useState(0);
	const [freight, setFreight] = useState(0);

	useEffect(() => {
		getCustomerBags();
	}, []);

	useEffect(() => {
		setTotalAmount(productsAmount + freight);
	}, [customerBags, productsAmount, freight]);

	const getCustomerBags = async () => {

		const data = await customerBagService.listByEmail(email);
		
		setCustomerBags(data);
		setProductsAmount(data.reduce((accumulator, current) => {
			accumulator += parseFloat(current.product.price) * current.quantity;
			
			return accumulator;
		}, 0));
		setFreight(7.90);
		setTotalAmount(productsAmount + freight);
	};

	return (
		<Container>

			
			<div className="customer-bag-left">
				<div className="logo">
					<Link to='/'>
						<h1>KIMOCHISM <span>気持ち</span></h1>
					</Link>
				</div>
				<div className="customer-bag-container-infos">
					<div className="customer-endereco">
						<span>
							Entregar em
						</span>
						<span>
							<img className="pin" src={MapPinIcon} alt="Perfil" width="18px" />
							&nbsp;Rua Alfrejord Braumderson A23, Santo Grau - SP
						</span>
						<span>
							Usar outro endereço &nbsp;
							<img src={ArrowIcon} alt="Perfil" width="5px" />
						</span>
					</div>

					<div className="customer-frete">
						<span>
							<img src={TruckIcon} alt="Perfil" width="18px" />
							&nbsp;Frete [ Sedex ]
						</span>
						<span>R$ 8,90</span>
					</div>

					<div className="customer-payment-options">
						<span>Pagar com</span>
						<div className="option-payment">
							<img src={BarcodeIcon} />
							<span>Boleto</span>
						</div>
						<div className="option-payment">
							<img src={MasterCardIcon} />
							<span>Cartão de Crédito / Débito</span>
						</div>
						<div className="option-payment">
							<img src={PixIcon} />
							<span>Pix</span>
						</div>
					</div>
					<div className="come-back">
						<Link to="/catalog">
							<img src={ArrowIcon} alt="Perfil" width="5px" />
							<span>Continuar comprando</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="customer-bag-right">

				<div className="header-products">
					<img src={BagIcon} />
					<span>Sua sacola</span>
				</div>
				
				{/* lista de produtos */}
				<div className="list-products">

					<div className="product-item">
						<img src="https://i.pinimg.com/564x/a9/70/49/a97049b24e6cf4c66a4203aed78d97e9.jpg"/>
						<div className="product-info">
							<span>Camiseta Oni Demon</span>
							<span>Tamanho</span>
							<span>Cor</span>
							<div className="quantity-products">
								<div>
									<span>Quantidade</span>
								</div>
								<div className="quantity-buttons">
									<button> - </button>
									<label> 1 </label>
									<button> + </button>
								</div>
							</div>
							<span>Preço Unidade</span>
						</div>
					</div>

					<div className="product-item">
						<img src="https://i.pinimg.com/564x/58/4d/05/584d051284c082464883ab5215f1864f.jpg"/>
						<div className="product-info">
							<span>Camiseta Oni Demon</span>
							<span>Tamanho</span>
							<span>Cor</span>
							<div className="quantity-products">
								<div>
									<span>Quantidade</span>
								</div>
								<div className="quantity-buttons">
									<button> - </button>
									<label> 1 </label>
									<button> + </button>
								</div>
							</div>
							<span>Preço Unidade</span>
						</div>
					</div>

					<div className="product-item">
						<img src="https://i.pinimg.com/564x/1c/e3/9d/1ce39d9aecc17bd5754c80b78f419c4f.jpg"/>
						<div className="product-info">
							<span>Camiseta Oni Demon</span>
							<span>Tamanho</span>
							<span>Cor</span>
							<div className="quantity-products">
								<div>
									<span>Quantidade</span>
								</div>
								<div className="quantity-buttons">
									<button> - </button>
									<label> 1 </label>
									<button> + </button>
								</div>
							</div>
							<span>Preço Unidade</span>
						</div>
					</div>

					<div className="product-item">
						<img src="https://i.pinimg.com/564x/c3/4c/a6/c34ca62345b7ac399f83bcda0e2d3f24.jpg"/>
						<div className="product-info">
							<span>Camiseta Oni Demon</span>
							<span>Tamanho</span>
							<span>Cor</span>
							<div className="quantity-products">
								<div>
									<span>Quantidade</span>
								</div>
								<div className="quantity-buttons">
									<button> - </button>
									<label> 1 </label>
									<button> + </button>
								</div>
							</div>
							<span>Preço Unidade</span>
						</div>
					</div>
				</div>
				{/* lista de produtos */}

				<div className="checkout-products">
					<div>
						<span>Total:</span>
						<span>R$ {totalAmount.toFixed(2)}</span>
					</div>
					<div>
						<span>Produtos:</span>
						<span>R$ {productsAmount.toFixed(2)}</span>
					</div>
					<div>
						<span>Frete:</span>
						<span>R$ {freight.toFixed(2)}</span>
					</div>
					<button>Finalizar</button>
				</div>
			</div>
		</Container>
	);
};

export default CustomerBag;
