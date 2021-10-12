// импортируем компонент окна с подтверждением удаления DeleteButton
import { DeleteButton } from '../Widgets/RemoveItem';

// создаем компонент списка продуктов
export function ProductList({ products, onDeleteProduct }) {
  return (
    <>
      <h2>Product List</h2>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <DeleteButton onDelete={onDeleteProduct} id={product.id} />
              {/* рендерим  компонент окна с подтверждением удаления DeleteButton */}
              {/* передаем через пропс метод удаления продукта и его id */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
