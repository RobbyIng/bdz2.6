import { NavLink } from 'react-router-dom'
import styles from './index.module.css'
import React from 'react'
import { Search } from '../../components/Search'
import { useSelector } from 'react-redux'

const Header = () => {
  const { name } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state)

  const navLinkMass = [
    {
      to: '/liked',
      iClName: 'fa fa-regular fa-heart fa-lg',
      pValue: 'Избранное',
    },
    {
      to: '/basket',
      iClName: 'fa fa-regular fa-briefcase fa-lg',
      pValue: 'Корзина',
      navCart: cart.length ? cart.length : '',
    },
    {
      to: '/userData',
      iClName: 'fa fa-light fa-paw fa-lg',
      pValue: name ? name : 'Пользователь',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.shopName}>
        <h1>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/products"
          >
            <i className="fa fa-light fa-paw fa-2xl"></i>
            <span className={styles.DogFood}>DogFood</span>
          </NavLink>
        </h1>
      </div>
      <Search />
      <nav className={styles.navigationWrapper}>
        <ul className={styles.navigation}>
          {navLinkMass.map((elemLink) => {
            return (
              <li key={elemLink.pValue}>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  to={elemLink.to}
                >
                  <i className={elemLink.iClName}></i>
                  {elemLink.navCart && (
                    <span className={styles.cartAmoun}>{elemLink.navCart}</span>
                  )}
                  <p className={styles.navText}>{elemLink.pValue}</p>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export const MemoHeader = React.memo(Header)
