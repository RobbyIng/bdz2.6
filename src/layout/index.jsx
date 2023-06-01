import { Outlet } from 'react-router-dom'
import { MemoFooter } from './Footer'
import { MemoHeader } from './Header'

export const Layout = () => {
  return (
    <>
      <MemoHeader />

      <Outlet />

      <MemoFooter />
    </>
  )
}
