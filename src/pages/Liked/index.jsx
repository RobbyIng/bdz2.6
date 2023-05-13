import styles from './index.module.css'
import { useNoAuth } from '../../hooks/useNoAuth'

export const LikedList = () => {
  const { token } = useNoAuth()

  return <h1 className={styles.userDataForm}>Список избраных товаров</h1>
}
