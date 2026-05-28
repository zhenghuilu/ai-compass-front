import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  )
}

export default MainLayout
