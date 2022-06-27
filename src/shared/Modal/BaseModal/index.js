import React from 'react';
import { StyledModal } from './styles';
import { CloseIcon } from 'assets/icons';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Modal from 'react-modal';

const BaseModal = ({
	children,
	isOpen,
	handleClose,
	showClose,
	requestClose,
	withBorder,
	isTopScreen,
	isCenterScreen
}) => {

	Modal.setAppElement('#__next');

	const customStyle = {
		overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 999,
			backgroundColor: 'rgba(12, 12, 12, 0.5)',
			backdropFilter: 'blur(1px)',
		}
	};

	return (
		<StyledModal
			isOpen={isOpen}
			withBorder={withBorder}
			isTopScreen={isTopScreen}
			isCenterScreen={isCenterScreen}
			style={customStyle}
			onRequestClose={requestClose ? () => handleClose() : () => { }}
		>
			<div className="header">
				<span>Kimochism 気持ち</span>
				{showClose &&
					<span onClick={() => handleClose()} className="close">
						<Image src={CloseIcon} alt="Fechar" />
					</span>
				}
			</div>
			<div className="content">
				{children}
			</div>
		</StyledModal>
	);
};

BaseModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	showClose: PropTypes.bool,
	requestClose: PropTypes.bool,
	children: PropTypes.node,
	withBorder: PropTypes.bool,
	isTopScreen: PropTypes.bool,
	isCenterScreen: PropTypes.bool,
};

export default BaseModal;
