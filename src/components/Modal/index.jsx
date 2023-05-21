import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import style from './index.module.css'

const ModalContent = ({ children, closeModal }) => {
  useEffect(() => {
    const listner = (event) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', listner)

    return () => {
      document.removeEventListener('keydown', listner)
    }
  }, [closeModal])

  return (
    <div className={style.modal_content}>
      <div className={style.btnWrapper}>
        <span className={style.modalTitle}>Введите данные продукта</span>
        <button className={style.closeButton} onClick={closeModal}>
          Х
        </button>
      </div>
      {children}
    </div>
  )
}

export const Modal = ({ isOpen = false, closeModal, children }) => {
  if (!isOpen) return null

  const handleExit = (event) => {
    if (event.target === event.currentTarget) closeModal()
  }

  return createPortal(
    <div onClick={handleExit} className={style.modal_wrapper}>
      <ModalContent closeModal={closeModal}>{children}</ModalContent>
    </div>,
    document.getElementById('modal')
  )
}
