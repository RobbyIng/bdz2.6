import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../../redux/slices/cartSlice'

export const ProductItem = ({ productItem }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state)

  const handleAddButton = () => {
    if (!cart.find((element) => element.id === productItem._id))
      dispatch(addCartItem({ id: productItem._id, count: 1, included: true }))
  }
  return (
    <div className={styles.cardProduct}>
      <div
        className={styles.cardMain}
        onClick={() => navigate(`/products/${productItem._id}`)}
      >
        <img
          src={productItem.pictures}
          className={styles.imgCardProduct}
          alt="Изображение корма для собак"
        />
        <div className={styles.cardBody}>
          <p className={styles.cardTitle}>Цена: {productItem.price}</p>
          <p className={styles.cardAmount}>{productItem.stock} шт</p>
          <p>{productItem.name}</p>
        </div>
      </div>
      <div className="btnBin">
        <button
          type="button"
          data-action="edit"
          className={styles.addToBin}
          onClick={() => handleAddButton()}
          disabled={productItem.stock === 0}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}
