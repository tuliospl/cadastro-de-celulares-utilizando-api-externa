import React from 'react'
import Header from './Header';
import Footer from './Footer';
import './styles/AddSmartphone.css';
import api from '../services/api';

let moment = require('moment');

const info = {
  "model": '',
  "price": '',
  "brand": '',
  "date": '',
  "endDate": '',
  "color": 'Preto',
  "code": '',
};

export default class AddSmartphone extends React.Component {
  constructor() {
    super();
    this.state = info;
    this.handlerChange = this.handlerChange.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.postAPI = this.postAPI.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.formatarMoeda = this.formatarMoeda.bind(this);
  }

  // Função generica para adicionar valores ao state
  handlerChange(event) {
    const {name, value} = event.target;
   this.setState({[name]: value})
  }

  // Faz requisição na Api adicionando novo celular
  postAPI() {
    let {code, model, price, brand, color, date, endDate } = this.state;
    let newData = moment(date).format('L')
    let newEndDate = moment(endDate).format('L');
    api.post('/', { 
      headers: { 'cpf': '04925787454' },
      body: { code, model, price, brand, color, date:newData, endDate:newEndDate},
    })
    .then((response) => {
      console.log(response.data)
      this.redirect();
    })
    .catch((err) => { 
      console.log(err)
    })
  }

  // Verifica se todas as entradas correspondem as condiçoes
  checkFields() {
    const { model, price, brand, date, endDate } = this.state;
    if(model.length < 2 || model.length > 255) {
       alert('O modelo deve conter mais de 2 caracteres e menos de 255!')}   
    if (price <= 0) {
       alert('O preço deve ser positivo')}
    if(brand.length < 2 || brand.length > 255) {
       alert('O modelo deve conter mais de 2 caracteres e menos de 255!')}
    if(date < '2018-12-25') {
       alert('A data de início deve ser posterior ao dia 25/12/2018!')}
    if(endDate <= date) {
       alert('A data de fim deve ser posterior a data de início!')}
    else {
      this.generateCode()
    }
  }

  // Gera um codigo de 8 digitos
  // https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
  generateCode = async () => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    await this.setState({ "code": result });
    this.postAPI();
  }
 
  // Formata o valor do campo Price em formato BR
  // https://html-css-js.com/?html=%3Cinput%20type=%22text%22%20maxlength=%229%22%20i$*$d=%22valor%22%20onkeyup=%22formatarMoeda()%22%3E&css=&js=%20%20%20%20function%20formatarMoeda()%20%7B%0A%20%20%20%20%20%20%20%20var%20elemento%20=%20document.getElementById(%27valor%27);%0A%20%20%20%20%20%20%20%20var%20valor%20=%20elemento.value;%0A%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20valor%20=%20valor%20+%20%27%27;%0A%20%20%20%20%20%20%20%20valor%20=%20parseInt(valor.replace(/%5B%5CD%5D+/g,%20%27%27));%0A%20%20%20%20%20%20%20%20valor%20=%20valor%20+%20%27%27;%0A%20%20%20%20%20%20%20%20valor%20=%20valor.replace(/(%5B0-9%5D%7B2%7D)$/g,%20%22,$1%22);%0A%0A%20%20%20%20%20%20%20%20if%20(valor.length%20%3E%206)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20valor%20=%20valor.replace(/(%5B0-9%5D%7B3%7D),(%5B0-9%5D%7B2%7D$)/g,%20%22.$1,$2%22);%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20elemento.value%20=%20valor;%0A%20%20%20%20%20%20%20%20if(valor%20==%20%27NaN%27)%20elemento.value%20=%20%27%27;%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%7D
  formatarMoeda(event) {
    let elemento = event.target;
    let valor = event.target.value;
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");    }
    elemento.value = valor;
    if(valor === 'NaN') elemento.value = '';
    valor = elemento.value;
    this.setState({price: valor});
  }

  // Redireciona para a rota '/'
  redirect() {
    window.location.href = "http://localhost:3000/";
  }

  render() {
    const { price } = this.state;
  return (
    <>
      <Header />
      <div className="container-detalhes">
        <div>
        <h5>Detalhes do produto</h5>
        <div className="layout-divs">
        <section className="section-1">
        <label> Modelo
          <input type="text" minLength='2' name="model"
          maxLength='255' onChange={this.handlerChange}/>
        </label>

        <label> Cor
          <select name="color" onChange={this.handlerChange}>
            <option>Preto</option>
            <option>Branco</option>
            <option>Dourado</option>
            <option>Rosa</option>
          </select>          
        </label>

        <label> Inicio das vendas
          <input type="date" name="date" onChange={this.handlerChange}/>
        </label>
        </section>

        <section className="section-2">
        <label> Marca
          <input type="text" minLength='2' maxLength='255' name="brand" onChange={this.handlerChange}/>
        </label>
        
        <label> Preço
          <input type="text" maxlength="9" value={price} onChange={this.formatarMoeda}/>
        </label>  


        <label> Fim das vendas
          <input type="date" name="endDate" onChange={this.handlerChange}/>
        </label>
        </section>
        </div>
        <div className="container-input">
        <input type="button" value="Voltar" onClick={ this.redirect } />
        <input type="button" value="Salvar" onClick={ this.checkFields } />
        </div>
      </div>
      </div>
      <Footer />
    </>
  )}
}
