import React from 'react';
import profile from '../assets/profile.svg';

const Header: React.FC = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="catalog">Каталог</div>
        <div className="info">
          <span>СРАВНЕНИЕ</span>
          <span>Личный кабинет</span>
          <div className="profile">
            <img src={profile} alt="profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
