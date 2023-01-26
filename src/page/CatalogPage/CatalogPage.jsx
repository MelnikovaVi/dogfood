import { useContext } from "react"
import CardList from "../../components/CardList/CardList"
import Sort from "../../components/Sort/Sort"
import { CardsContext } from "../../context/CardsContext"



export const CatalogPage = () => {
  const {cards} = useContext(CardsContext)
    return (
        <>
            <Sort/>
              <div className="content__cards">
                <CardList cards={cards}/>
              </div>
        </>
    )
}