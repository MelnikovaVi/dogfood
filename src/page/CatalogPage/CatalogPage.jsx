import CardList from "../../components/CardList/CardList"
import Sort from "../../components/Sort/Sort"
import Spinner from "../../components/Spinner/Spinner"



export const CatalogPage = ({loading}) => {
    return (
        <>
            <Sort/>
              <div className="content__cards">
                {loading ? < Spinner/> : <CardList/>}
              </div>
        </>
    )
}