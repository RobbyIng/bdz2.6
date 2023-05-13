import styles from './index.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

const secondFootElem = [
  { title: 'Каталог', to: '' },
  { title: 'Акции', to: '' },
  { title: 'Новости', to: '' },
  { title: 'Отзывы', to: '' },
]
const thirdFootElem = [
  { title: 'Оплата и доставка', to: '' },
  { title: 'Часто спрашивают', to: '' },
  { title: 'Обратная связь', to: '' },
  { title: 'Контакты', to: '' },
]
const fourthFootElem = [
  { iClName: 'fa fa-brands fa-telegram fa-xl' },
  { iClName: 'fa fa-brands fa-instagram fa-xl' },
  { iClName: 'fa fa-brands fa-vk fa-xl' },
  { iClName: 'fa fa-brands fa-whatsapp fa-xl' },
  { iClName: 'fa fa-brands fa-viber fa-xl' },
]

const Footer = (styleFooter) => {
  return (
    <div className={styles.Footer} id="footerId">
      <div className={styles.firstFooter}>
        <h1>
          <i className="fa fa-light fa-paw fa-2xl"></i>
          DogFood
        </h1>
        <p>
          <i className="fa fa-light fa-shield-dog fa-xl"></i>
          <span>"Интернет-магазин DogFood.ru"</span>
        </p>
      </div>
      <nav className={styles.secondFooter}>
        <ul>
          {secondFootElem.map((elemLink) => {
            return (
              <li key={elemLink.title}>
                <Link to={elemLink.to}>{elemLink.title}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <nav className={styles.thirdFooter}>
        <ul>
          {thirdFootElem.map((elemLink) => {
            return (
              <li key={elemLink.title}>
                <Link to={elemLink.to}>{elemLink.title}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <ul className={styles.fourthFooter}>
        <li className={styles.BoldText}>Мы на связи</li>
        <li className={styles.BoldText}>8 (999) 00-00-00</li>
        <li>
          <Link to="">dogfood.ru@gmail.com</Link>
        </li>
        <li className={styles.social}>
          {fourthFootElem.map((elemLink) => {
            return (
              <div key={elemLink.iClName}>
                <i className={elemLink.iClName}></i>
              </div>
            )
          })}
        </li>
      </ul>
    </div>
  )
}

export const MemoFooter = React.memo(Footer)
