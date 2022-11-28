import Instagram from "./img/instagram.svg";
import Telegram from "./img/telegram.svg";
import Viber from "./img/viber.svg";
import Vk from "./img/vk.svg";
import Whatsapp from "./img/whatsapp.svg";
import Logo from "../Logo/Logo";
import "./Style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          	<div className="footer__col">
            	<Logo className="logo footer__logo" title="Logo DogFood Footer" href="#"/>
            	<p className="footer__copyright"> Учебный проект  «Интернет-магазин DogFood.ru» не распространять!</p>
          	</div>
          	<div className="footer__col">
            	<nav className="menu-bottom">
              		<a className="menu-bottom__item" href="/catalogue" >Каталог</a>
              		<a className="menu-bottom__item" href="/catalogue" >Акции</a>
              		<a className="menu-bottom__item" href="/catalogue" >Новости</a>
              		<a className="menu-bottom__item" href="/catalogue" >Отзывы</a>
            	</nav>
          </div>

        	<div className="footer__col">
            	<nav className="menu-bottom">
              		<a className="menu-bottom__item" href="/catalogue" >Оплата и доставка</a>
              		<a className="menu-bottom__item" href="/catalogue" >Часто спрашивают</a>
              		<a className="menu-bottom__item" href="/catalogue" >Обратная связь</a>
              		<a className="menu-bottom__item" href="/catalogue" >Контакты</a>
            	</nav>
          </div>

          <div className="footer__col">
            <div className="contacts">
              <p className="contacts__title">Мы на связи</p>
              <a className="contacts__tel contacts__link">8 (999) 00-00-00</a>
              <a className="contacts__mail contacts__link"> dogfood.ru@gmail.com</a>
              
			  <ul className="socials contacts__socials">
                <li className="socials__item">
                  <a className="socials__link" href="#">
                    <img src={Telegram} alt="telegram" className="socials__icon"/>
                  </a>
                </li>

                <li className="socials__item">
                  <a className="socials__link" href="#">
                    <img src={Whatsapp} alt="whatsapp" className="socials__icon"/>
                  </a>
                </li>

                <li className="socials__item">
                  <a className="socials__link" href="#">
                    <img src={Viber} alt="viber" className="socials__icon"/>
                  </a>
                </li>

                <li className="socials__item">
                  <a className="socials__link" href="#">
                    <img src={Instagram} alt="instagram" className="socials__icon"/>
                  </a>
                </li>

                <li className="socials__item">
                  <a className="socials__link" href="#">
                    <img src={Vk} alt="vk" className="socials__icon"/>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
