import React from 'react';

const NoInternet = ({ history }) => {
  return (
    <div className="page-not-found">
      <h1>:( İnternet Bağlantınız Bulunmamaktadır.</h1>
      <p>Lütfen İnternet Bağlantınızı Kontrol Edip Tekrar Deneyiniz.</p>
      <br/>
      <button
          className="button"
          onClick={() => window.location.reload(true)}
      >
        Tekrar Dene
      </button>
    </div>
    
  );
};

export default NoInternet;
