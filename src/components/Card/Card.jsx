import "./Style.css";
import {ReactComponent as Save} from "./save.svg";

import classNames from "classnames";
import { myLike } from "../Utils/Products";

// пропсы из CardList
const Card = 
({
	name, price, discount,
	weight, description,
	pictures, tags,
	onProductLike2,
	_id, likes, 
	actualUser
}) => {	
	const discount__price = Math.round(price - (price * discount / 100));

	const like = myLike(likes, actualUser?._id)

	function handeleLike() {
		onProductLike2({_id, likes})
	}

	return (
		
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
			<a href="/product" className="card__link">
				<img src={pictures} alt={description} className="card__image" />
				<div className="card__desc">

					<span className={!!discount ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>

					{!!discount && <span className="card__price card__price_type_discount">{discount__price}&nbsp;₽</span>}

					<span className="card__weight">{weight}</span>
					<p className="card__name">{name}</p>
				</div>
			</a>

			<a href="#/" className="card__cart btn btn_type_primary">Купить</a>
			
		</div>
	);
};

export default Card;