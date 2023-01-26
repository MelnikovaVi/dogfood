import "./Style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useEffect } from "react";
import api from "../Utils/Api";
import useDebounce from "../../hooks/Decorator(debounce)";
import { myLike } from "../Utils/Products";
import { CatalogPage } from "../../page/CatalogPage/CatalogPage";
import { ProductPage } from "../../page/ProductPage";
import { Routes, useLocation } from "react-router-dom"
import { Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { NotFoundPage } from "../../page/NotFoundPage/NotFoundPage"
import { UserContext } from "../../context/UserContext"
import { CardsContext } from "../../context/CardsContext";
import { FAQPage } from "../../page/FAQPage/FAQPage"
import { FavoritePage } from "../../page/FavoritePage/FavoritePage";
import Modal from "../Modal/Modal";
import { Registr } from "../FSRegistration/Registr";
import { Login } from "../FSLogin/Login";
import { RecoveryPass } from "../FSRecoveryPassword/RecoveryPass";


const App = () => {

  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [actualUser, setActualUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [myFav, setMyFav] = useState([])
  const [activeModal, setActiveModal] = useState(false)
  const [actualSort, setActualSort] = useState('')
  

  const searchQueryWithDebounce = useDebounce(searchQuery, 1000)
  const locate = useLocation()
  const background = locate.state?.background
  const firstPath = locate.state?.firstPath
  
  const handleRequest = useCallback (() => {
    setLoading(true)
    api.getSearch(searchQueryWithDebounce)
      .then((searchRes) => {
        setCards(searchRes)
      })
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }, [searchQueryWithDebounce])

  const handleFormSubmit = (searchText) => {
    navigate('/');
    setSearchQuery(searchText)
    handleRequest(searchText);
  }

  const handleInputChange = (inputValue) => {
       setSearchQuery(inputValue)
  }
 
  const handleSetUserUpdate = (updateUserInfo) => {
    api.setUserInfo(updateUserInfo)
    .then((newUserInfo)=> {
    setActualUser(newUserInfo)
    })
    .catch(error => console.log(error))
  }

  const handleChangeLike = useCallback ((product) => {
    const like = myLike(product.likes, actualUser._id)
    return api.changeLike(product._id, like)
    .then((newCardFromServer) => {
     const checkForUpdate = cards.map(oldCardFromState => {
      return oldCardFromState._id === newCardFromServer._id ? newCardFromServer : oldCardFromState 
     })

      if (!like) {
        setMyFav(prevState => [...prevState, newCardFromServer])
      } else {
        setMyFav(prevState => prevState.filter(card => card._id !== newCardFromServer._id))
      }

      setCards(checkForUpdate);
      return newCardFromServer
    })
    .catch(error => console.log(error))
  }, [actualUser, cards])

  useEffect (() => {
       handleRequest();
  }, [searchQueryWithDebounce])

  useEffect(() => {
    setLoading(true)
    api.waitAllInfo()
    .then(([cardFromApi, dataUser])=> {
      setCards(cardFromApi.products)
      setActualUser(dataUser)
      const favProducts = cardFromApi.products.filter(item => myLike(item.likes, dataUser._id))
      setMyFav(favProducts)

    })
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  }, [])
 
  const SortingCard = (actualSort) => {
    switch (actualSort) {
      case 'cheap':
         setCards(cards.sort((a, b) => a.price - b.price)); break;

      case 'expensive':
        setCards(cards.sort((a, b) => b.price - a.price)); break;

      case 'saleExToCh': 
        setCards(cards.sort((a, b) => b.discount - a.discount)); break;

      default: 
        setCards(cards.sort((a, b) => a.price - b.price));
    }
  }



  return (
    
    <UserContext.Provider value={{user:actualUser, loading}}>
      <CardsContext.Provider value={{cards, myFav, handeleLike:handleChangeLike, SortingCard, actualSort, setActualSort}}>
        <Header 
          user={actualUser} 
          onUpdateUser={handleSetUserUpdate}
          >
            <>
                <Logo/>
                <Routes>
                  <Route path="/" element ={
                    <Search 
                    formSubmit={handleFormSubmit} 
                    onInputChange={handleInputChange}
                    /> 
                  }/>
                </Routes>
            </>
        </Header>


        <main className="content container">
            <SearchInfo searchText={searchQuery}/>

            <Routes location={(background && {pathname:firstPath}) || locate}>
              <Route index element = {<CatalogPage/>}/>
              <Route path="/product/:productId" element = {<ProductPage loading={loading}/>}/>
              <Route path="/my-fav" element={<FavoritePage/>}></Route>
              <Route path="/faq" element={<FAQPage/>} />
              <Route path="*" element={<NotFoundPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Registr/>}/>    
              <Route path='/recover-password' element={<RecoveryPass/>}/>    
            </Routes>

            {background && (
              <Routes>
                <Route path='/login' element={
                <Modal>
                  <Login/>  
                </Modal>}/>

                <Route path='/register' element={
                  <Modal>
                      <Registr/>
                  </Modal>}/>        

                <Route path='/recover-password' element={
                  <Modal>
                      <RecoveryPass/>
                  </Modal>}/>        
              </Routes>
            )}
            
        </main>
        <Footer/>
      </CardsContext.Provider>
    </UserContext.Provider>
  )
};

export default App;