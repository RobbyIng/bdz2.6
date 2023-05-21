import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../../redux/slices/cartSlice'
import { addFavorItem, deleteFavorItem } from '../../redux/slices/favoriteSlice'
import styles from './index.module.css'

export const FavorButton = ({ productItem }) => {
  const dispatch = useDispatch()

  const { cart, favorites } = useSelector((state) => state)

  const includeFavor = !favorites.find((element) => element === productItem._id)
  const includeCart = !cart.find((element) => element.id === productItem._id)

  const handleAddButton = () => {
    if (!cart.find((element) => element.id === productItem._id))
      dispatch(addCartItem({ id: productItem._id, count: 1, included: true }))
  }

  const handleLikeButton = (idProd) => {
    !favorites.find((el) => el === idProd)
      ? dispatch(addFavorItem(idProd))
      : dispatch(deleteFavorItem(idProd))
  }

  return (
    <div className={styles.btnContainer}>
      <button
        className={
          includeFavor ? styles.likeContainer : styles.likeContainerFavor
        }
        onClick={() => handleLikeButton(productItem._id)}
      >
        <i className="fa fa-regular fa-heart fa-lg"></i>
      </button>
      <button
        type="button"
        data-action="edit"
        className={includeCart ? styles.addToBin : styles.addToBinPressed}
        onClick={() => handleAddButton()}
        disabled={productItem.stock === 0}
      >
        {includeCart ? 'В корзину' : 'В корзине'}
      </button>
    </div>
  )
}
