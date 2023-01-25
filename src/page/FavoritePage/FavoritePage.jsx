import { useContext } from "react"
import CardList from "../../components/CardList/CardList"
import { ContentHeader } from "../../components/ContentHeader/ContentHeader"
import Sort from "../../components/Sort/Sort"
import { CardsContext } from "../../context/CardsContext"



export const FavoritePage = () => {
    const {myFav} = useContext(CardsContext)
    return (
        <>
            <ContentHeader name='Избранное'/>
            <Sort/>
              <div className="content__cards">
                <CardList cards={myFav}/>
              </div>
        </>
    )
}