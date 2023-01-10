import React, { useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import { AuthContext } from 'contexts/AuthContext';
import BaseModal from '../BaseModal';
import api from 'api';

const AddressSelector = ({ isOpen, handleClose, onSelected, requestClose }) => {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState();

    const { email } = useContext(AuthContext);

    useEffect(() => {
        getAddresses();
    }, []);

    const getAddresses = async () => {
        await api.users.showByEmail(email).then(async user => {
            await api.customers.showByUser(user._id).then(async customer => {
                await api.addresses.listByCustomer(customer._id).then(addresses => setAddresses(addresses));
            });
        });
    };

    const selectAddress = (event, address) => {
        setSelected(address);
        const addresses = document.querySelector('.addresses');

        addresses.childNodes.forEach(child => {
            //@ts-ignore
            child.style.background = 'white';
            //@ts-ignore
            child.style.color = 'black';
        });

        event.target.style.background = 'black';
        event.target.style.color = 'white';
    };

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose} requestClose={requestClose} withBorder isCenterScreen showClose>
            <Container>
                <div className="addresses">
                    {addresses &&
                        addresses.map(address => {
                            return (
                                <span key={address._id} onClick={e => selectAddress(e, address)}>
                                    {address.street}, {address.number}
                                </span>
                            );
                        })}
                </div>
                {/* <span className="add-address">
          Adicionar endereço
        </span> */}
                <button
                    disabled={!selected}
                    onClick={() => {
                        onSelected(selected);
                        handleClose();
                    }}
                >
                    Selecionar
                </button>
            </Container>
        </BaseModal>
    );
};

export default AddressSelector;
