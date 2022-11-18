import "./Style.css";
import save from "./save.svg";

// пропсы из CardList
const Card = 
({
	name,
	price,
	discount,
	weight,
	description,
	picture
}) => {	
	const discount__price = Math.round(price - (price * discount / 100));

	return (
		
		<div className="card">

			<div className="card__sticky card__sticky_type_top-left">
				{/* условный рендер поля discount, значения false не рендерятся */}
				{!!discount && <span className="card__discount">{`-${discount} %`}</span>}
			</div>

			<div className="card__sticky card__sticky_type_top-right">
				<button className="card__favorite">
					<img src={save} alt="В избранное" className="card__favorite-icon"/>
				</button>
			</div>

			{/* Вся карточка (картинка, цены, количество, название товара) является ссылкой поэтому оборачиваем в тег а*/}
			<a href="/product" className="card__link">
				<img src={picture} alt={description} className="card__image" />
				<div className="card__desc">

					<span className={!!discount ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>

					{!!discount && <span className="card__price card__price_type_discount">{discount__price}&nbsp;₽</span>}

					<span className="card__weight">{weight}</span>
					<p className="card__name">{name}</p>
				</div>
			</a>

			<a href="#" className="card__cart btn btn_type_primary">Купить</a>
			
		</div>
	);
};

export default Card;