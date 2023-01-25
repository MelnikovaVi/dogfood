import Spinner from "../components/Spinner/Spinner"
import api from "../components/Utils/Api"
import { useCallback } from "react"
import { Product } from "../components/Product/Product"
import { useParams } from "react-router-dom"
import NotFoundComponent from "../components/NotFoundComponent/NotFoundComponent"
import {CardsContext} from '../context/CardsContext'
import { useContext } from "react"
import { useApi } from "../hooks/useApi"


export const ProductPage = () => {
  // const [product, setProduct] = useState(null)
  // const [errorState, setErrorState] = useState(null);

  //хук для параметров url
  const {productId} = useParams();
	const {handeleLike} = useContext(CardsContext)
  
  const handeleGetProduct = useCallback(() => api.getProductById(productId), [productId])
  
  const {
    data: product,
    setData: setProduct,
    loading,
    errorState
  } = useApi(handeleGetProduct)
  
  // функция установки лайка
  const handleChangeLikeInPage = useCallback(() => {
    handeleLike(product)
      .then((updateProduct) => {
        setProduct(updateProduct)
      })
  }, [product, handeleLike, setProduct])

  // useEffect(() => {
    //   // setLoading(true)
  //   api.getProductById(productId)
  //   .then((productData)=> {
  //     setProduct(productData)
  //     // setActualUser(dataUser)
  //   })
  //   .catch(error => setErrorState(error))
  //   // .finally(()=> {
  //   //   setLoading(false)
  //   //   })
  // }, [])

  return (
  <>
        <div className="content__cards">{loading ? < Spinner/> :
        !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleChangeLikeInPage}/>}
        {errorState && <NotFoundComponent/>}
        </div>
  </>
  )
}