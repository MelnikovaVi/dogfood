import Header from "../components/Header/Header"
import Logo from "../components/Logo/Logo"
import Search from "../components/Search/Search"
import Sort from "../components/Sort/Sort"
import Spinner from "../components/Spinner/Spinner"
import Footer from "../components/Footer/Footer"

import api from "../components/Utils/Api"

import { useCallback, useEffect, useState } from "react"
import { myLike } from "../components/Utils/Products"
import { Product } from "../components/Product/Product"

const PRODUCT_ID = '622c77e877d63f6e70967d22'

export const ProductPage = () => {
  // хук для получения информации о пользователе
  const [actualUser, setActualUser] = useState(null);

  // хук для спинера - ожидания
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null)

  // Обновление функции поиск данных по серверу
  const handleRequest = useCallback ((searchQuery) => {
    setLoading(true)
    api.getSearch(searchQuery)
      .then((searchRes) => {})
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }, [])

  // функция установки лайка
  const handleChangeLikeInPage = useCallback(() => {
    const like = myLike(product.likes, actualUser._id)
    api.changeLike(product._id, like)
      .then((newProduct) => {
        setProduct(newProduct)
      })
  }, [product, actualUser])


  useEffect(() => {
    setLoading(true)
    Promise.all([api.getProductById(PRODUCT_ID), api.getUserInfo()])
    .then(([productData, dataUser])=> {
      setProduct(productData)
      setActualUser(dataUser)
    })
    .catch(error => console.log(error))
    .finally(()=> {
      setLoading(false)
      })
  }, [])

  return (
  <>
    <Header>
      <>
        <Logo/>
        <Search formSubmit={handleRequest} /> 
      </>
    </Header>

    <main className="content container">
      <Sort/>
        <div className="content__cards">{loading ? < Spinner/> : <Product {...product} actualUser={actualUser} onProductLike={handleChangeLikeInPage}/>}
        </div>
    </main>

    <Footer/>
  </>
    )
}