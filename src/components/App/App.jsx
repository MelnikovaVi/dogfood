import "./Style.css";
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import Footer from "../Footer/Footer";
import SearchInfo from "../SearchInfo/SearchInfo";
import Sort from "../Sort/Sort";
import data from "../../assets/data.json";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useEffect } from "react";


const App = () => {
  // данные будут храниться не в массиве, а в состоянии. Начальное состояние это (data),
  // cards - переменная состояния, в качестве пропса передаем в CardList и называем goods,
  // также goods отправляем в файл CardList.jsx
  const [cards, setCards] = useState(data);

  // состояние ввода в инпут 
  const [searchQuery, setSearchQuery] = useState('');

  // функция - подобие связи с сервером (метод фильтр применяем на исходных данных)
  const handleRequest = () => {
       const filterCards = data.filter( item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
       setCards( state => filterCards);
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

  useEffect (() => {
       handleRequest();
}, [searchQuery])

  return (
    <>
      <Header>
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
                 <CardList goods={cards}/>
              </div>
      </main>

      <Footer/>
    </>
  );
};

export default App;