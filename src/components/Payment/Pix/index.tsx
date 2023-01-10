import React, { useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import { AuthContext } from 'contexts/AuthContext';
import { SocketContext } from 'contexts/SocketContext';
import { CloseIcon, ContentCopy } from 'assets/icons';
import { BaseModal } from 'shared';
import api from 'api';


const Pix = ({ isOpen, handleClose, amount, description }) => {
    const socket = useContext(SocketContext);
    const { email } = useContext(AuthContext);

    const [qrCode64, setQrCode64] = useState();
    const [qrCodeCopyAndPaste, setQrCodeCopyAndPaste] = useState();
    const [paymentId, setPaymentId] = useState(0);
    const [paymentAccept, setPaymentAccept] = useState(false);

    useEffect(() => {
        socket &&
            socket.on('receivedPix', payload => {
                if (payload.status === 'PENDING' && payload.id === paymentId) {
                    alert('Paga essa porra menó');
                }
            });
    }, [socket, paymentId]);

    const createPayment = async () => {
        // showFallback();
        const user = await api.users.showByEmail(email);

        if (user) {
            const customer = await api.customers.showByUser(user._id);

            const nameSplitted = customer.full_name.split(' ');

            let document = customer.document.replace(/[^\w\s]/gi, '');

            const firstName = nameSplitted[0];
            const lastName = nameSplitted[nameSplitted.length - 1];

            await api.orders
                .store({
                    status: 'PENDING',
                    amount: Number(amount),
                    freight: 10,
                    total: amount + 10,
                    description,
                })
                .then(async order => {
                    const payment_data = {
                        transaction_amount: Number(amount),
                        description,
                        payment_method_id: 'pix',
                        payer: {
                            email: user.email,
                            first_name: firstName,
                            last_name: lastName,
                            identification: {
                                type: 'CPF',
                                number: document,
                            },
                            address: {
                                zip_code: '06233200',
                                street_name: 'Av. das Nações Unidas',
                                street_number: '3003',
                                neighborhood: 'Bonfim',
                                city: 'Osasco',
                                federal_unit: 'SP',
                            },
                        },
                        notification_url: 'https://kimo-api-lite.herokuapp.com/payments/paymentNotification',
                        metadata: {
                            order_id: order._id,
                        },
                    };

                    await api.payments
                        .createPayment(payment_data)
                        .then(
                            ({
                                response: {
                                    id,
                                    point_of_interaction: {
                                        transaction_data: { qr_code_base64, qr_code },
                                    },
                                },
                            }) => {
                                setQrCode64(qr_code_base64);
                                setQrCodeCopyAndPaste(qr_code);
                                setPaymentId(id);
                            },
                        )
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        }

        // hideFallback();
    };

    useEffect(() => {
        if (isOpen) {
            createPayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const cancelPayment = async () => {
        await api.payments.cancelPayment(paymentId);
        await socket.close();
        handleClose();
    };

    const showPaymentStatus = async () => {
        const paymentStatus = await api.payments.showPaymentStatus(paymentId);

        if (paymentStatus) {
            const {
                body: { status },
            } = paymentStatus;

            if (status === 'approved') {
                setPaymentAccept(true);
            }
        }
    };

    return (
        <BaseModal
            isOpen={isOpen}
            handleClose={handleClose}
            showClose={false}
            requestClose={false}
            withBorder={true}
            isCenterScreen={true}
        >
            <Container>
                <button id="closeModal" onClick={() => cancelPayment()}>
                    <img src={CloseIcon} alt="Fechar" width="24px" />
                </button>
                {qrCode64 && (
                    <img src={`data:image/jpeg;base64,${qrCode64}`} style={{ width: '200px' }} alt="Qr Code" />
                )}
                <span className="paymentId">{paymentId}</span>
                {qrCodeCopyAndPaste && (
                    <>
                        <label htmlFor="copyQrCode">Copiar Hash:</label>
                        <div className="containerQrCode">
                            <input type="text" id="copyQrCode" value={qrCodeCopyAndPaste} onChange={() => {}} />
                            <button>
                                <img className="copyCut" alt="" src={ContentCopy} width="24px" />
                            </button>
                        </div>
                    </>
                )}

                {paymentAccept}
                <button className="btn-primary" onClick={() => showPaymentStatus()}>
                    Confirmar pagamento
                </button>
            </Container>
        </BaseModal>
    );
};

export default Pix;
