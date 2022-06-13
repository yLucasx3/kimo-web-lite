import React from 'react';
import Link from 'next/link';
import { Container } from './styles';
import Image from 'next/image';

const Newsletter = () => {
	return (
		<Container>
			<h1>Vistos recentemente</h1>
			<div className="latest-suggestions">
				<Link href="/catalog">
					<div className="suggestion">
						<div className="suggestion-image">
							<Image src="https://cdn.shopify.com/s/files/1/0508/9745/3208/products/RaidendakiBACKSFW_web_1b18d0e2-933d-4c39-b453-261c821d755a_900x.png?v=1649218186" alt=""/>
						</div>
						<span className="suggestion-name">Gostosinha</span>
						<div className="suggestion-prices">
							<span className="suggestion-cut-price">$8,99</span>
							<span className="suggestion-price">$7,99</span>
							<span className="suggestion-save-price">Save $1,00</span>
						</div>
					</div>
				</Link>
				<Link href="/catalog">
					<div className="suggestion">
						<div className="suggestion-image">
							<Image src="https://cdn.shopify.com/s/files/1/0508/9745/3208/products/RaidendakiBACKSFW_web_1b18d0e2-933d-4c39-b453-261c821d755a_900x.png?v=1649218186" alt=""/>
						</div>
						<span className="suggestion-name">Gostosinha</span>
						<div className="suggestion-prices">
							<span className="suggestion-cut-price">$8,99</span>
							<span className="suggestion-price">$7,99</span>
							<span className="suggestion-save-price">Save $1,00</span>
						</div>
					</div>
				</Link>
				<Link href="/catalog">
					<div className="suggestion">
						<div className="suggestion-image">
							<Image src="https://cdn.shopify.com/s/files/1/0508/9745/3208/products/RaidendakiBACKSFW_web_1b18d0e2-933d-4c39-b453-261c821d755a_900x.png?v=1649218186" alt=""/>
						</div>
						<span className="suggestion-name">Gostosinha</span>
						<div className="suggestion-prices">
							<span className="suggestion-cut-price">$8,99</span>
							<span className="suggestion-price">$7,99</span>
							<span className="suggestion-save-price">Save $1,00</span>
						</div>
					</div>
				</Link>
				<Link href="/catalog">
					<div className="suggestion">
						<div className="suggestion-image">
							<Image src="https://cdn.shopify.com/s/files/1/0508/9745/3208/products/RaidendakiBACKSFW_web_1b18d0e2-933d-4c39-b453-261c821d755a_900x.png?v=1649218186" alt=""/>
						</div>
						<span className="suggestion-name">Gostosinha</span>
						<div className="suggestion-prices">
							<span className="suggestion-cut-price">$8,99</span>
							<span className="suggestion-price">$7,99</span>
							<span className="suggestion-save-price">Save $1,00</span>
						</div>
					</div>
				</Link>
				<Link href="/catalog">
					<div className="suggestion">
						<div className="suggestion-image">
							<Image src="https://cdn.shopify.com/s/files/1/0508/9745/3208/products/RaidendakiBACKSFW_web_1b18d0e2-933d-4c39-b453-261c821d755a_900x.png?v=1649218186" alt=""/>
						</div>
						<span className="suggestion-name">Gostosinha</span>
						<div className="suggestion-prices">
							<span className="suggestion-cut-price">$8,99</span>
							<span className="suggestion-price">$7,99</span>
							<span className="suggestion-save-price">Save $1,00</span>
						</div>
					</div>
				</Link>
			</div>
			<hr className="medium-hr"/>
		</Container>
	);
};
export default Newsletter;