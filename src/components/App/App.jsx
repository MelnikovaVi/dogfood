import "./Style.css";
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import Footer from "../Footer/Footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import Sort from "../Sort/Sort";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useEffect } from "react";
import api from "../Utils/Api";
import useDebounce from "../../hooks/Decorator(debounce)";
import { myLike } from "../Utils/Products";
import Spinner from "../Spinner/Spinner";


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
 
  // Обновление функции поиск данных по серверу
  const handleRequest = () => {
    setLoading(true)
    api.getSearch(searchQueryWithDebounce)
      .then((searchRes) => {
        setCards(searchRes)
      })
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }

  // функция, осуществляющая поиск по сабмиту (кнопка лупы) - в качестве пропса передается в компонент <Search/> в App
  const handleFormSubmit = (e) => {
       e.preventDefault(); // запрещает действие по умолчанию
       handleRequest();
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
  function handleChangeLike(product) {
    const like = myLike(product.likes, actualUser._id)
    api.changeLike(product._id, like)
    .then((newCardFromServer) => {
     const checkForUpdate = cards.map(oldCardFromState => {
      return oldCardFromState._id === newCardFromServer._id ? newCardFromServer : oldCardFromState 
     })
      setCards(checkForUpdate)
    })
    .catch(error => console.log(error))
  }

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
    <>
      <Header user={actualUser} onUpdateUser={handleSetUserUpdate}>
          <>
              <Logo/>
              <Search formSubmit={handleFormSubmit} onInputChange={handleInputChange}/> 
      {/* так как были переданы пропсы в элемент Search, нужно их принять в исходном файле Search, 
      то есть деструктурировать и передать их по ключу(имени пропса) - formSubmit и onInputChange */}
          </>
      </Header>

      <main className="content container">
          <SearchInfo searchText={searchQuery} searchQuantity={cards.length}/>
          <Sort/>
              <div className="content__cards">
                {loading ? < Spinner/> : <CardList goods={cards} onProductLike={handleChangeLike} actualUser={actualUser}/>}
              </div>
      </main>

      <Footer/>
    </>
  );
};

export default App;