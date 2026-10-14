import { useItemsStore } from '../store/useItemsStore'
import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
    const ItemsList = () => {
    const { items, getItems } = useItemsStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            try {
                await getItems()
            } catch (error) {
                console.error(error)
                setError(error.message || 'Что-то пошло не так')
            } finally {
                setIsLoading(false)
            }
        }

        load()

        const id = setInterval(() => {
            getItems().catch((error) => {
                console.error(error)
            })
        }, 10000)

        return () => clearInterval(id)
    }, [])

    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>

            {isLoading && <p>Загрузка</p>}
            {!isLoading && error && <p>{error}</p>}

            {!isLoading && !error && (
                <div className="items-grid">
                    {items.map((item) => (
                        <ItemCard key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    )
}
export default ItemsList