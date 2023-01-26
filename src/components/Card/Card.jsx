import "./Style.css";
import {ReactComponent as Save} from "./save.svg";

import classNames from "classnames";
import { myLike } from "../Utils/Products";
import { discountPrice } from "../Utils/Utils";

import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CardsContext } from "../../context/CardsContext";

//подключение скелетона
import ContentLoader from "react-content-loader"

const Card = 
({
	name, price, discount,
	weight, description,
	pictures, tags,
	_id, likes, 
	// actualUser - после добавления в контекст в пропсах элемент не нужен
}) => {	
	// создаем контекст для текущего пользователя
	const {user:actualUser, loading} = useContext(UserContext)
	const {handeleLike : onProductLike2} = useContext(CardsContext)

	
	const discount__price = discountPrice(price, discount);

	const like = myLike(likes, actualUser?._id)

	function handeleLike() {
		onProductLike2({_id, likes})
	}

	return (
		<>
		{loading ?
			<ContentLoader 
			speed={3}
			width={245}
			height={410}
			viewBox="0 0 245 410"
			backgroundColor="#fcfbf7"
			foregroundColor="#d7d5d5"
			>
				<rect x="15" y="10" rx="10" ry="10" width="225" height="330" /> 
				<rect x="15" y="355" rx="10" ry="10" width="225" height="55" />
			</ContentLoader> :
		
			<div className="card">

				<div className="card__sticky card__sticky_type_top-left">
					{/* условный рендер поля discount, значения false не рендерятся */}
					{!!discount && <span className="card__discount">{`-${discount} %`}</span>}
					{tags && tags.map((tags) => <span key={tags} className={classNames(tags, {[`tags tags_${tags}`]:true})}>{tags}</span>)}
				</div>

				<div className="card__sticky card__sticky_type_top-right">
					<button className={classNames('card__favorite', {'card__favorite-active': like})} onClick={handeleLike}>
						<Save className="card__favorite-icon"/>
					</button>
				</div>

				{/* Вся карточка (картинка, цены, количество, название товара) является ссылкой поэтому оборачиваем в тег а*/}
				<Link to={`/product/${_id}`} className="card__link">
					<img src={pictures} alt={description} className="card__image" />
					<div className="card__desc">

						<span className={!!discount ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>

						{!!discount && <span className="card__price card__price_type_discount">{discount__price}&nbsp;₽</span>}

						<span className="card__weight">{weight}</span>
						<p className="card__name">{name}</p>
					</div>
				</Link>

				<a href="#/" className="card__cart btn btn_type_primary">Купить</a>
				
			</div>	
		}
		</>
	);
};

export default Card;