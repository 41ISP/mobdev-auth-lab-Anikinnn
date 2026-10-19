//Доделать
import { useState } from 'react'
import {useParams}from 'react-router-dom'
import { api } from '../api/api'
import {useItemsStore} from '../store/useItemsStore'
import Button from '../components/Button'
import Input from '../components/Input'
const ItemDetail = () => {
const {id} = useParams()
const item = useItemsStore((state) => state.items.find((i) => i.id ===Number(id)))
if (!item) return 
<p 
className='container'>Загрузка...
</p>    
    return (
        <div 
            className='container'>
            <h1> 
                {item.title}
            </h1>
            <p>
                {item.description}
            </p>
            <p> 
                Цена: {item.price}
            </p>
        </div>
    )
}
export default ItemDetail    