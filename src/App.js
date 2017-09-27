import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


const searchURL = 'https://api.mercadolibre.com/sites/MCO/search?q=';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      productName : '',
      productList : []
    }
    this.searchProduct = this.searchProduct.bind(this);
    this.setValueSearch = this.setValueSearch.bind(this);
  }
  searchProduct(e){
    axios.get(searchURL+this.state.productName)
      .then(response=>{
        console.log('the response is',response)
        var res = response.data.results;
        this.setState({productList:res})
      })
      .catch(error=>{

      })
  }
  setValueSearch(e){
    this.setState({productName:e.target.value});
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>MercadoSearch camiloperezv</h2>
          <div className="form-inline">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                </div>
                <input type="text" className="form-control" value={this.state.productName} onChange={this.setValueSearch} maxLength="64" placeholder="Buscar" />
              </div>
            </div>
            <button onClick={this.searchProduct} className="btn btn-primary">Buscar</button>
          </div>
          <table className="table table-striped">
            <tbody>
              {
                this.state.productList.map(prod => 
                  <tr> 
                    <td><img src={prod.thumbnail} alt=""/></td>
                    <td>
                      {prod.title}
                      <br/>
                      Vendidos: {prod.sold_quantity}
                    </td>
                    <td>{prod.price.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })}</td>
                    <td><a href={prod.permalink} className="btn btn-success" target="_blank">Ver</a></td>
                  </tr>
                )
              }
              <tr>
              </tr>
            </tbody>
          </table>
	      </div>
      </div>
    );
  }
  
}

export default App;
