import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { FavorButton } from '../FavorButton'

export const ProductItem = ({ productItem }) => {
  const navigate = useNavigate()

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
          <p className={styles.cardTitle}>{productItem.name}</p>
          <p className={styles.cardPrc}>Цена: {productItem.price}</p>
          <p className={styles.cardAmount}>{productItem.stock} шт</p>
          <p className={styles.cardAmount}>Скидка:{productItem.discount}</p>
          <p className={styles.cardAmount}>
            Рекомендаций:{productItem.likes.length}
          </p>
        </div>
      </div>
      <FavorButton productItem={productItem} className={styles.favorBtn} />
    </div>
  )
}
