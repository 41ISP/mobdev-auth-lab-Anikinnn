import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useItemsStore } from "../store/useItemsStore"
import { api } from "../api/api"
import Input from "../components/Input"
import Button from "../components/Button"

const ItemDetail = () => {
    const { id } = useParams()
    const item = useItemsStore((state) => state.items.find((i) => i.id === Number(id)))
    const getItems = useItemsStore((state) => state.getItems)

    const [error, setError] = useState("")

    if (!item) return <div className="container">Загрузка...</div>

    const handleBid = async (e) => {
        e.preventDefault()
        setError("")

        const form = e.target
        const amount = Number(form.bidInput.value)

        try {
            await api.createBid({ id, amount })
            form.reset()
            await getItems() // обновляем данные, чтобы изменилась "Текущая ставка"
        } catch (err) {
            setError(err.response?.data?.error || "Не удалось сделать ставку")
        }
    }

    return (
        <div className="container">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
                ← Вернуться к списку товаров
            </Link>

            {error && <div className="alert alert-error active">{error}</div>}

            <div className="item-detail">
                <div className="item-header">
                    <div>

                        {item.imageUrl && (
                            <img src={item.imageUrl} className="item-image-large" alt={item.title} />
                        )}
                    </div>

                    <div className="item-info">
                        <span className="item-status">{item.status}</span>
                        <h1 className="item-title-large">{item.title}</h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">{item.username.slice(0, 2).toUpperCase()}</div>
                            <div className="seller-details">
                                <div className="seller-name">{item.username}</div>
                                <div className="seller-date">{new Date(item.createdAt).toLocaleString("ru-RU")}</div>
                            </div>
                        </div>

                        <div className="item-description-full">
                            {item.description}
                        </div>

                        <div className="price-section">
                            <div className="starting-price">Начальная цена:</div>
                            <div className="current-price">{item.price} ₽</div>

                            <div className="highest-bid">
                                Текущая ставка: {item.highestBid ? `${item.highestBid} ₽` : "ставок нет"}
                            </div>

                            <form className="bid-form" onSubmit={handleBid}>
                                <Input
                                    type="number"
                                    name="bidInput"
                                    className="bid-input"
                                    placeholder="Введите вашу ставку"
                                    min={item.highestBid ?? item.price}
                                    step="100"
                                    required
                                />
                                <Button type="submit" className="btn-bid">
                                    Сделать ставку
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Поработать над историей ставок */}
            <div className="bids-section">
                <div className="bids-header">
                    <h2 className="bids-title">История ставок</h2>
                    <span className="bids-count">{bids.length}</span>
                </div>
            </div>
            <div className="bids-list">
                {bids.map((bid,index) => (
                    <div 
                    key={bid.id} 
                    className={`bid-item ${index === 0 ? 'highest-bid-item' : ''}`}>
                    <div className="bid-user">
                        <div className="bid-avatar">{bid.username.toUpperCase()}</div>
                        <div className="bid-details">
                            <span className="bid-username">{bid.username}</span>
                            <span className="bid-time">{new Date(bid.createdAt)}</span>
                        </div>
                        {
                            index === 0 && 
                            <span
                            className="highest-badge">🏆 Лидирует
                            </span>
                        }           
                    </div>
                    <div 
                    className="bid-amount">
                        {
                            bid.amount
                        } 
                        ₽
                    </div>
                )
            )
                </div>                 
             )    
        </div>
    </div>
)
}

export default ItemDetail