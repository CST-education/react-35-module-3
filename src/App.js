import './App.scss';
import { Component } from 'react';
import { Form } from './components/Forms/Form';
//  ===  ИМПОРТ КОМПОНЕНТА СПИСКА ПРОДУКТОВ
import { ProductList } from './components/Products/ProductList';
import { Modal } from './components/Modal/Modal';

class App extends Component {
  state = {
    counter: 0,
    isOpen: false,

    allProducts: [],
    showModal: false,
  };
  componentDidMount() {
    // console.log(`MOUNT`);
    const localProducts = localStorage.getItem('products');
    const parseProducts = JSON.parse(localProducts);
    if (parseProducts) {
      this.setState({ allProducts: parseProducts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(`UPDATE`);
    // если изменилось значение поля стейта prevState.prop
    // То будем переписывать локалСторедж
    if (prevState.allProducts !== this.state.allProducts) {
      localStorage.setItem('products', JSON.stringify(this.state.allProducts));
    }
  }
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUnmount() {
    console.log(`UNMOUNT`);
  }

  addNewProduct = obj =>
    this.setState(prevState => ({
      allProducts: [...prevState.allProducts, obj],
    }));

  //  ===  метод удаления продукта
  deleteProduct = id =>
    this.setState(prev => ({
      allProducts: prev.allProducts.filter(prod => prod.id !== id),
    }));
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    // console.log(`RENDER method`);
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <Form addNewProduct={this.addNewProduct} />
          </Modal>
        )}
        <h1>FE-35 Product</h1>
        <button type="button" onClick={this.toggleModal}>
          Add Product
        </button>
        {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ === */}
        <ProductList
          products={this.state.allProducts}
          onDeleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
export default App;
