import Spinner from "../components/Spinner/Spinner"
import api from "../components/Utils/Api"
import { useCallback, useEffect, useState } from "react"
import { myLike } from "../components/Utils/Products"
import { Product } from "../components/Product/Product"
import { useParams } from "react-router-dom"
import NotFoundComponent from "../components/NotFoundComponent/NotFoundComponent"
import {CardsContext} from '../context/CardsContext'
import { useContext } from "react"


export const ProductPage = ({ loading }) => {
  const [product, setProduct] = useState(null)

  //хук для параметров url
  const {productId} = useParams();
  
  const [errorState, setErrorState] = useState(null);

	const {handeleLike} = useContext(CardsContext)

  // функция установки лайка
  const handleChangeLikeInPage = useCallback(() => {
    handeleLike(product)
      .then((updateProduct) => {
        setProduct(updateProduct)
      })
    // const like = myLike(product.likes, actualUser._id)
    // api.changeLike(product._id, like)
    //   .then((newProduct) => {
    //     setProduct(newProduct)
    //   })
  }, [product, handeleLike])


  useEffect(() => {
    // setLoading(true)
    api.getProductById(productId)
    .then((productData)=> {
      setProduct(productData)
      // setActualUser(dataUser)
    })
    .catch(error => setErrorState(error))
    // .finally(()=> {
    //   setLoading(false)
    //   })
  }, [])

  return (
  <>
        <div className="content__cards">{loading ? < Spinner/> :
        !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleChangeLikeInPage}/>}
        {errorState && <NotFoundComponent/>}
        </div>
  </>
  )
}