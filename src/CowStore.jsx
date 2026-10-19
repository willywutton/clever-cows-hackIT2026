// CowStore.jsx is the store for Clover Cowdini, paid for with Moolah earned by helping.
// Moolah can't be bought, so nothing here costs real money.
import { useState } from 'react'
import { ART } from './assets/cowArt'
import { CATEGORIES, STATS, STORE_ITEMS } from './data/store'
import './CowStore.css'

// { moolah } is the student's balance. { owned } and { equipped } are her items.
// { onBuy } buys an item and returns false if it couldn't. { onToggleAccessory } puts one on or off.
// { onBought } is told the item's name after a purchase, for a thank-you message.
function CowStore({ moolah, owned, equipped, onBuy, onToggleAccessory, onBought }) {
    const [category, setCategory] = useState("furniture")
    const items = STORE_ITEMS.filter((item) => item.category === category)

    function handleBuy(item) {
        if (onBuy(item)) {
            onBought(item)
        }
    }

    return (
        <section className="card cow-store">
            <div className="cow-store-top">
                <h3>Store</h3>
                <p className="cow-store-balance"><span aria-hidden="true">🪙</span> {moolah} Moolah</p>
            </div>

            <div className="cow-store-tabs" role="group" aria-label="Store category">
                {CATEGORIES.map((c) => (
                    <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                        <span aria-hidden="true">{c.emoji}</span> {c.label}
                    </button>
                ))}
            </div>

            <ul className="cow-store-items">
                {items.map((item) => {
                    const isOwned = !item.consumable && owned.includes(item.id)
                    const statLabel = STATS.find((s) => s.id === item.stat).label
                    return (
                        <li key={item.id} className="cow-store-item">
                            <span className="cow-store-art" aria-hidden="true">
                                {ART[item.id].image ? <img src={ART[item.id].image} alt=""/> : ART[item.id].emoji}
                            </span>
                            <strong>{item.name}</strong>
                            <span className="cow-store-effect">+{item.boost} {statLabel}</span>
                            {isOwned && item.category === "accessory" ? (
                                <button className="cow-store-wear" aria-pressed={equipped.includes(item.id)} onClick={() => onToggleAccessory(item.id)}>
                                    {equipped.includes(item.id) ? "Wearing ✓" : "Put on"}
                                </button>
                            ) : isOwned ? (
                                <span className="cow-store-owned">In her room ✓</span>
                            ) : (
                                <button className="cow-store-buy" onClick={() => handleBuy(item)} disabled={moolah < item.price}>
                                    {item.consumable ? "Use" : "Buy"} · {item.price} 🪙
                                </button>
                            )}
                        </li>
                    )
                })}
            </ul>
            <p className="cow-store-note">Moolah is earned by helping and can't be bought.</p>
        </section>
    )
}

export default CowStore
