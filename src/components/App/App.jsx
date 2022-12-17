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
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { NotFoundPage } from "../../page/NotFoundPage/NotFoundPage"
import { UserContext } from "../../context/UserContext"
import { CardsContext } from "../../context/CardsContext";


const App = () => {
  // Новое начальное состояние это не (data) как было, а пустой массив
  // cards - переменная состояния, в качестве пропса передаем в CardList и называем goods,
  // также goods отправляем в файл CardList.jsx
  const [cards, setCards] = useState([]);

  // состояние ввода в инпут 
  const [searchQuery, setSearchQuery] = useState('');

  // хук для получения информации о пользователе
  const [actualUser, setActualUser] = useState(null);

  // хук для спинера - ожидания
  const [loading, setLoading] = useState(true)
 
  // константа с функцией дебаунса
  const searchQueryWithDebounce = useDebounce(searchQuery, 1000)
 
  //
  const navigate = useNavigate()

  // Обновление функции поиск данных по серверу
  const handleRequest = useCallback (() => {
    setLoading(true)
    api.getSearch(searchQueryWithDebounce)
      .then((searchRes) => {
        setCards(searchRes)
      })
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }, [searchQueryWithDebounce])

  // функция, осуществляющая поиск по сабмиту (кнопка лупы) - в качестве пропса передается в компонент <Search/> в App
  const handleFormSubmit = (searchText) => {
    navigate('/');
    setSearchQuery(searchText)
    handleRequest(searchText);
  }

  // функция изменяющая setSearchQuery - в качестве пропса передается в компонент <Search/> в App
  const handleInputChange = (inputValue) => {
       setSearchQuery(inputValue)
       // в inputValue приходят данные введенные в инпут, то есть (e.target.value) из файла Search
  }

  // функция обновляющая данные пользователя  
  const handleSetUserUpdate = (updateUserInfo) => {
    api.setUserInfo(updateUserInfo)
    .then((newUserInfo)=> {
    setActualUser(newUserInfo)
    })
    .catch(error => console.log(error))
  }

  // функция установки лайка
  const handleChangeLike = useCallback ((product) => {
    const like = myLike(product.likes, actualUser._id)
    return api.changeLike(product._id, like)
    .then((newCardFromServer) => {
     const checkForUpdate = cards.map(oldCardFromState => {
      return oldCardFromState._id === newCardFromServer._id ? newCardFromServer : oldCardFromState 
     })
      setCards(checkForUpdate);
      return newCardFromServer
    })
    .catch(error => console.log(error))
  }, [actualUser])

  useEffect (() => {
       handleRequest();
  }, [searchQueryWithDebounce])

  // хук получения данных
  useEffect(() => {
    setLoading(true)
    api.waitAllInfo()
    .then(([cardFromApi, dataUser])=> {
      setCards(cardFromApi.products)
      setActualUser(dataUser)
    })
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  }, [])

  return (
    // В контекст можно оборачивать не весь документ, а часть (например только header или только main и другие компоненты)
    <UserContext.Provider value={{user:actualUser}}>
      <CardsContext.Provider value={{cards, handeleLike:handleChangeLike}}>
        <Header 
          user={actualUser} 
          onUpdateUser={handleSetUserUpdate}>
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
            <SearchInfo searchText={searchQuery}
                        searchQuantity={cards.length}/>


            <Routes>
              <Route index element = {
                <CatalogPage loading={loading}/>
              }/>
              <Route path="/product/:productId" element = {
                <ProductPage loading={loading}/>
              }/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            
        </main>

        <Footer/>
      </CardsContext.Provider>
    </UserContext.Provider>
  )
};

export default App;