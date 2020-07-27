import React from 'react';

const PageNotFound = ({ history }) => {
  return (
    <div className="page-not-found">
      <h1>:( Görünüşe Göre Sayfa Bulunamadı :/</h1>
      <br/>
      <button
          className="button"
          onClick={history.goBack}
      >
        Geri Dön
      </button>
    </div>
  );
};

export default PageNotFound;
