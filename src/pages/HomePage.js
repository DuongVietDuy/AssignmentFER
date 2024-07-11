import React from 'react'
import NavBars from '../components/NavBars';
import AppCarousel from './Carousel'
import NewProductList from './NewProductList'

const HomePage = () => {
  return (
    <>
     <NavBars />
      <AppCarousel />      
        <NewProductList />
    </>
  )
}

export default HomePage
