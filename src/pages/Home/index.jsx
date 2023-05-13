import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { useAuth } from '../../hooks/useAuth'

export const Home = () => {
  useAuth()

  return (
    <div className={styles.wrapperInfo}>
      <h1>
        <Link to={'/signin'} className={styles.redColor}>
          Авторизуйтесь
        </Link>
        , чтобы отобразить список продуктов
      </h1>
      <h1>
        <Link to={'/signup'} className={styles.redColor}>
          Пройдите регистрацию
        </Link>
        , если вы не зарегистрированы
      </h1>
    </div>
  )
}
