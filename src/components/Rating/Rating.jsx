import { useCallback, useState } from 'react'
import m from './Styles.module.css'
import { ReactComponent as Bone } from './bone.svg'
import { useEffect } from 'react'
import classNames from 'classnames'

export const Rating = ({isEdite = false, rating, setRating, ...props}) => {
    //массив для хранения звезд рейтинга
    const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>))

    
    const starsAssembly = useCallback((actualRating) => {
        const updateArray = ratingArray.map((rate, i)=> {
            return(
                <Bone className={classNames(m.bone, {[m.fill]:i<actualRating, [m.edit]:isEdite })} 
                onMouseEnter={()=>changeView(i+1)}
                onMouseLeave={()=>changeView(rating)}
                onClick={()=>changeRating(i+1)}/>
            )})
        setRatingArray(updateArray)
        },[rating])
        
        const changeView = (rating) => {
            if (!isEdite) return
            starsAssembly(rating)
        }
        const changeRating =(rating) => {
            if (!isEdite || !setRating) return
            setRating(rating)
        }
        
        useEffect (()=> {
            starsAssembly(rating)
        }, [rating, starsAssembly])

    return (
        <div>
            {ratingArray.map((rate, i) => <span key={i}>{rate}</span>)}
        </div>
    )
}