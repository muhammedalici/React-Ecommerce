import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, applyFilter } from 'actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const [isMounted, setMounted] = useState(false);
  const [field, setFilter] = useState({
    brand: props.filter.brand,
    minPrice: props.filter.minPrice,
    maxPrice: props.filter.maxPrice,
    sortBy: props.filter.sortBy
  });
  const dispatch = useDispatch();
  const max = selectMax(props.products);
  const min = selectMin(props.products);

  useEffect(() => {
    if (isMounted && window.screen.width <= 480) {
      props.history.push('/');
    }

    if (isMounted && props.closeModal) props.closeModal();
    
    setFilter(props.filter);
    setMounted(true);
    window.scrollTo(0, 0);
  }, [props.filter]);


  const onPriceChange = (min, max) => {
    setFilter({ ...field, minPrice: min, maxPrice: max });
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };


  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some(key => field[key] !== props.filter[key]);
    
    if (field.minPrice > field.maxPrice) {
      return false;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      props.closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

    if (filterFields.some(key => !!props.filter[key])) {
      dispatch(resetFilter());
    } else {
      props.closeModal();
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Kategoriler</span>
        <br/>
        <br/>
        {props.productsLength === 0 && props.isLoading ? (
          <h5 className="text-subtle">Yükleniyor</h5>
        ) : (
          <select 
              className="filters-brand"
              value={field.brand}
              disabled={props.isLoading || props.productsLength === 0}
              onChange={onBrandFilterChange}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="meyve & sebze">Meyve & Sebze</option>
            <option value="süt ve süt ürünleri">Süt ve Süt Ürünleri</option>
            <option value="kahvaltılık ürünler">Kahvaltılık Ürünler</option>
            <option value="et & balık">Et & Balık</option>
            <option value="temel gıda">Temel Gıda</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Sırala</span>
        <br/>
        <br/>
        <select 
              className="filters-sort-by d-block"
              value={field.sortBy}
              disabled={props.isLoading || props.productsLength === 0}
              onChange={onSortFilterChange}
          >
            <option value="">Sıralama Yok</option>
            <option value="name-asc">İsime Göre A - Z</option>
            <option value="name-desc">İsime Göre Z - A</option>
            <option value="price-desc">Azalan Fiyat</option>
            <option value="price-asc">Artan Fiyat</option>
          </select>
      </div>
      <div className="filters-field">
        <span>Fiyat Aralığı</span>
        <br/>
        <br/>
        {props.productsLength === 0 && props.isLoading ? (
          <h5 className="text-subtle">Yükleniyor</h5>
        ) : (
          <PriceRange 
              min={min} 
              max={max} 
              initMin={field.minPrice}
              initMax={field.maxPrice}
              isLoading={props.isLoading}
              onPriceChange={onPriceChange}
              productsLength={props.productsLength}
          />
        )}
      </div>
      <div className="filters-action">
        <button
            className="filters-button button button-small"
            disabled={props.isLoading || props.productsLength === 0}
            onClick={onApplyFilter}
        >
          Filtrele
        </button>
        <button
            className="filters-button button button-border button-small"
            disabled={props.isLoading || props.productsLength === 0}
            onClick={onResetFilter}
        >
          Filtreyi Sıfırla
        </button>
      </div>
    </div>
  );
};

export default withRouter(Filters);
