import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Modal from '../ui/Modal';
import Boundary from '../ui/Boundary';

import { CHECKOUT_STEP_1 } from 'constants/routes';
import { clearBasket } from 'actions/basketActions';
import { displayMoney } from 'helpers/utils';

const Basket = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    let total = 0;

    if (basket.length !== 0) {
      const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
      total = result.toFixed(2);
    }

    return displayMoney(total);
  };

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  const onCheckOut = () => {
    if ((basket.length !== 0 && props.isAuth)) {
      document.body.classList.remove('is-basket-open');
      props.history.push(CHECKOUT_STEP_1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove('basket-open');
    props.history.push(CHECKOUT_STEP_1);
  };

  const onClearBasket = () => {
    basket.length !== 0 && dispatch(clearBasket());
  }

  return (
    <Boundary>
      <Modal isOpen={isModalOpen} onRequestClose={onCloseModal}>
        <p className="text-center">Satın almak için lütfen giriş yapınız</p>
        <br/>
        <div className="d-flex-center">
          <button 
              className="button button-border button-border-gray button-small"
              onClick={onCloseModal}
          >
            Alışverişe devam et
          </button>
          &nbsp;
          <button 
              className="button button-small"
              onClick={onSignInClick}
          >
            Satın almak için giriş yap
          </button>
        </div>
      </Modal>
      <div className="basket">
        <div className="basket-list">
          <div className="basket-header">
            <h3 className="basket-header-title">
              Sepetim &nbsp; 
              <span>({` ${basket.length} ${basket.length > 1 ? 'Ürün' : 'Ürün'}`})</span>
            </h3>
            <BasketToggle>
              {({ onClickToggle }) => (
                <span 
                    className="basket-toggle button button-border button-border-gray button-small" 
                    onClick={onClickToggle}
                >
                  Kapat
                </span>
              )}
            </BasketToggle>
            <button
                className="basket-clear button button-border button-border-gray button-small"
                disabled={basket.length === 0}
                onClick={onClearBasket}
            >
              <span>Sepeti Temizle</span>
            </button>
          </div>
          {basket.length <= 0 && (
            <div className="basket-empty">
              <h5 className="basket-empty-msg">Sepetiniz Boş</h5>
            </div> 
          )}
          {basket.map(product => (
            <BasketItem 
                key={product.id}
                product={product}
                basket={basket}
                dispatch={dispatch}
            />
          ))}
        </div>
        <div className="basket-checkout">
          <div className="basket-total">
            <p className="basket-total-title">Toplam Tutar:</p>
            <h2 className="basket-total-amount">{calculateTotal()}</h2>
          </div>
          <button 
              className="basket-checkout-button button"
              disabled={basket.length === 0 || props.location.pathname === '/checkout'}
              onClick={onCheckOut}
          >
            Hemen Al
          </button>
        </div>
      </div>
    </Boundary>
  );
};

export default withRouter(Basket);
