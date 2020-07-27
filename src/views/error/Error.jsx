import React from 'react';

const Error = ({ history }) => {
  return (
    <div className="page-not-found">
      <h1>:( Bir Hata ile Karşılaşıldı. Lütfen Tekrar Deneyiniz.</h1>
      <br/>
      <button
          className="button"
          onClick={() => history.push('/')}
      >
        Tekrar Dene
      </button>
    </div>
    
  );
};

export default Error;
