import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import api from '../services/api';
import './styles/Phone.css';
import Trash from '../images/delete-24px.svg';
import Add from '../images/stay_current_portrait-24px.svg';
import Edit from '../images/edit-24px.svg';

export default function Phones() {
const [arraySmartphones, setArraySmartphones] = useState([]);

// Faz uma requisição GET na api retornando todos os celulares e o salva no state
useEffect(() => {
  api.get('/',{ headers:  { 'cpf': '04925787454' } }).then((response) => {
    setArraySmartphones(response.data);
  })
  //eslint-disable-next-line
}, [])

// Faz uma requisição DELETE na api passando index para deletar o celular
const deleteSmartphone = (event) => {
  const id = event.target.value;
  api.delete(`/${id}`,{ headers: { 'cpf': '04925787454' } }).then((response) => {
    console.log(response)
    // eslint-disable-next-line no-restricted-globals
    window.location.href = `http://localhost:3000/`
  })  
}

// Redireciona para a rota '/add'
const redirect = () => {
  window.location.href = "http://localhost:3000/add";
}

// Redireciona para a rota '/edit/CODIGO_DO_CELULAR'
const editSmartphone = (event) => {
  const id = event.target.value
  window.location.href = `http://localhost:3000/edit/${id}`;
}

const formatarMoeda = (price) => {
  let valor = price;
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
}

console.log(arraySmartphones)

  return (
    <>
      <Header />
      <div className="container-phones">
      <div className="container-scroll">
        <div className="products-button">
        <h5>Produtos</h5>
      <button onClick={redirect} className="add" type="button"><span className="spans">+</span>
              <img alt="editar item" src={ Add } />adicionar
      </button>
      </div>
        <table className="tables">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Modelo</th>
              <th scope="col">Preço</th>
              <th scope="col">Marca</th>
              <th scope="col">Cor</th>
            </tr>
          </thead>
          <tbody>
          { arraySmartphones.map(({ brand, model, code, color, price, _id}) =>
            <tr>
              <td data-label="Codigo">{code}</td>
              <td data-label="Modelo">{model}</td>
              <td data-label="Preço">{ formatarMoeda(price) }</td>
              <td data-label="Marca">{brand}</td>
              <td data-label="Cor">{color}</td>
              <div className="buttons">
              
              <input className="edit" alt="" type="image" value={_id} src={ Edit } onClick={editSmartphone} />
              
              <input className="trash" alt="" type="image" value={_id} src={ Trash } onClick={deleteSmartphone} />
             
              </div>
            </tr>
          )} 
          </tbody>
        </table>
        </div>
      </div>
      <Footer />
    </>
  )
}
