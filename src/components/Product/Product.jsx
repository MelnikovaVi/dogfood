import m from './Styles.module.css'
import classNames from "classnames";
import { discountPrice } from "../Utils/Utils";
import { ReactComponent as Save } from "../Card/save.svg";
import delivery from "./icon-delivery.png";
import quality from "./icon-quality.png";
import { createMarkup, myLike } from "../Utils/Products";

export const Product = ({
  name, likes=[], pictures, price, discount, reviews,
  tags, description, _id, actualUser, onProductLike
}) => {

  const discount__price = discountPrice(price, discount);
  const liked = myLike(likes, actualUser?._id);
  const descriptionHTML = createMarkup(description);


  return (
    <>
        <div className={m.productMain}>
            <a href="#" className="button-back">Назад</a>
            <h1 className={m.productName}>{name}</h1>

            <div><span>Артикул:</span><b>12345678</b></div>
        </div>

        <div className={m.product}>
            <div className={m.productImage}>
                <img src={pictures} alt={name} />
            </div>

            <div className={m.description}>
                <span className={!!discount ? m.cardOldPrice : m.cardPrice}>{price}&nbsp;₽</span>
                {!!discount && (<span className={classNames(m.cardPrice, "card__price_type_discount")}>{discount__price}&nbsp;₽</span>)}

                <div className={m.btnWraper}>
                    <div className={m.btnContainer}>
                        <button className={m.btnMinus}>-</button>
                        <span className={m.quantity}>0</span>
                        <button className={m.btnPlus}>+</button>
                    </div>
                    <a href="#" className={classNames("btn", "btn_type_primary", m.cart)}>В корзину</a>
                </div>    

                <button className={classNames(m.favorite, {[m.favoriteActive]: liked})} onClick={onProductLike}>
                    <Save/>
                    <span>{liked ? "В избранном" : "В избранное"}</span>
                </button>
                    
                <div className={m.deliveryBlock}>
                    <img src={delivery} alt="truck" />
                    <div className={m.deliveryInfo}>
                        <h3 className={m.deliveryInfoText}>Доставка в любой город!</h3>
                        <p className={m.deliveryInfoTextP}>Доставка курьером от <span>299&nbsp;₽</span></p>
                        <p className={m.deliveryInfoTextP}>Доставка в пункт выдачи от <span>199&nbsp;₽</span></p>
                    </div>
                </div>

                <div className={m.qualityBlock}>
                    <img src={quality} alt="truck" />
                    <div className={m.qualityInfo}>
                        <h3 className={m.qualityInfoText}>Гарантия качества</h3>
                        <p className={m.qualityInfoTextP}>Если Вам не понравилось качество нашей продукции, то мы вернем Вам деньги.</p>
                    </div>
                </div>
            </div>
        </div> 
        
        <div className={m.descriptionDetailed}>
            <h2 className={m.descriptionTitle}>Описание</h2>
            <p className={m.descriptionText} dangerouslySetInnerHTML={descriptionHTML}></p>
            <h2 className={m.descriptionTitle}>Характеристика</h2>
            <div className={m.grid}>
                <div className={m.descWeight}>Вес</div>
                <div className={m.descWeightText}>1 шт. 120 - 200 грамм</div>
                <div className={m.descPrice}>Цена</div>
                <div className={m.descPriceText}>{price}&nbsp;₽ за 100 грамм</div>
                <div className={m.descAdvantage}>Польза</div>
                <div className={m.descAdvantageText}>
                    <p>Пища не содержит консервантов, эмульгаторов и искусственных красителей.</p>
                    <p>Присутствие в рационе натурального белка, клетчатки, жиров и углеводов.</p>
                    <p>Тренируют жевательные мышцы, укрепляют десны, способствуют механической очистке зубов, препятствует отложению зубного камня и налета.</p>
                    <p>Счастливое и довольное животное.</p>
                </div>
            </div>
        </div>

    </>
  )
}