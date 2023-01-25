import "./Style.css";
import classNames from "classnames";
import { CardsContext } from "../../context/CardsContext";
import { useContext } from "react";

const tabs = [
    {
      id: 'cheap',
      title: 'Сначала дешевые',
    },
    {
      id: 'expensive',
      title: 'Сначала дорогие',
    },
    {
      id: 'saleExToCh',
      title: 'По скидке',
    },
  ]

const Sort = () => {

	const {actualSort, setActualSort, SortingCard} = useContext(CardsContext)

	const handleClick = (e, tab) => {
		e.preventDefault();
		setActualSort(tab.id)
		SortingCard(tab.id)
	}

	return (
		<div className="sort content__sort">
			{tabs.map (tab => (
				<div 
					className={classNames("sort__link", {"sort__link_selected": actualSort === tab.id })}
					key={tab.id}
					id={tab.id}>
						<a onClick={(e) => handleClick(e, tab)}>{tab.title}
						</a>
				</div>
			))}
		</div>
	);
};

export default Sort;
