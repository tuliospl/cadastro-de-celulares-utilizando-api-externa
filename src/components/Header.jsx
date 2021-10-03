import React from 'react';
import './styles/Header.css';
import Logo from '../images/mobile-alt-solid.svg';

export default function Header() {
  return (
    <header className="container-Header">
      <div className="div-header">
      <span className="logotipo">M</span>
      <img className="altSvg" alt="Logotipo da Muelhor Comunicação" src={ Logo } width='50vh' height='40vh'/>
      </div>
    </header>
  )
};
