import React from 'react'
import { ContextConsumerAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import DashboardCustomer from '../../components/DashboardCustomer'

export default function Home () {
  const { user } = ContextConsumerAuth()
  return user
    ? (
      <main>
        <Header />
        <DashboardCustomer />
      </main>
      )
    : null
}
