import React, { useRef, useState } from 'react';
import { BarcodeIcon, PixIcon, MasterCardIcon, ArrowIcon } from 'assets/icons';

import { Container } from 'styles/pages/product.styles';
import CreditCard from './CreditCard';
import Pix from './Pix';


const Payment = ({ orderAmount, description }) => {
    const options = {
        default: 'padrão',
        creditCard: 'cartão de crédito',
        ticket: 'boleto',
        pix: 'pix',
    };

    const [option, setOption] = useState(options.default);
    const [pixModalIsOpen, setPixModalIsOpen] = useState(false);

    const paymentOptionsRef = useRef(null);

    const changeOption = (event, option) => {
        setOption(option);

        paymentOptionsRef.current.childNodes.forEach(paymentOption => {
            paymentOption.classList.remove('active');
        });

        event.target.classList.add('active');
    };

    const checkout = () => {
        if (option === options.pix) {
            setPixModalIsOpen(true);
        }
    };

    return (
        <Container>
            <div className="pay-with">
                <span>
                    {option === options.default ? 'Pagar' : 'Pagando'} com {option !== options.default ? option : ''}
                </span>

                {option === options.creditCard && (
                    <span
                        className="change-payment-method"
                        onClick={() => {
                            setOption(options.default);
                        }}
                    >
                        Alterar forma de pagamento &nbsp;
                        <img src={ArrowIcon} alt="Seta direita" width="5px" />
                    </span>
                )}
            </div>

            {option !== options.creditCard && (
                <div ref={paymentOptionsRef}>
                    <div className="option-payment" onClick={event => changeOption(event, options.ticket)}>
                        <img src={BarcodeIcon} alt="Boleto" />
                        <span>Boleto</span>
                    </div>
                    <div className="option-payment" onClick={() => setOption(options.creditCard)}>
                        <img src={MasterCardIcon} alt="Cartã de crédito" />
                        <span>Cartão de Crédito / Débito</span>
                    </div>
                    <div className="option-payment" onClick={event => changeOption(event, options.pix)}>
                        <img src={PixIcon} alt="PIX pagamentos" />
                        <span>Pix</span>
                    </div>
                </div>
            )}

            {option === options.creditCard && <CreditCard orderAmount={orderAmount} />}
            {option !== options.creditCard && option !== options.default && (
                <button onClick={() => checkout()}>Finalizar compra</button>
            )}

            {option === options.pix && (
                <Pix
                    isOpen={pixModalIsOpen}
                    handleClose={() => setPixModalIsOpen(false)}
                    amount={orderAmount}
                    description={description}
                />
            )}
        </Container>
    );
};

export default Payment;
