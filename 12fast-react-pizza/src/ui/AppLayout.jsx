import React from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader';
import SearchOrder from '../features/order/SearchOrder';


export default function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
  return (
    <div className='layout'>
        {isLoading && <Loader />}
        <Header />
        <SearchOrder />

        <main>
            <Outlet />
        </main>

        <CartOverview />
    </div>
  )
}
