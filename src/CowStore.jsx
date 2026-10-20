// CowStore.jsx is the store for Clover Cowdini, paid for with Moolah earned by helping.
// Moolah can't be bought, so nothing here costs real money.
import Graphic from './Graphic'
import { useState } from 'react'
import { ART } from './assets/cowArt'
import { CATEGORIES, STAT_MAX, STATS, STORE_ITEMS } from './data/store'
import './CowStore.css'

// { moolah } is the student's balance. { owned } and { equipped } are her items.
// { onBuy } buys an item and returns false if it couldn't. { onToggleAccessory } puts one on or off.
// { onBought } is told the item's name after a purchase, for a thank-you message.
// { stats } are her current stats: grass and care can't be used once that stat is full.
// { headwear } is what her helper-type outfit already wears on its head, if anything;
// hats and crowns are hidden under it, and the store says so.
function CowStore({ moolah, owned, equipped, stats, headwear, onBuy, onToggleAccessory, onBought }) {
    const [category, setCategory] = useState("accessory")
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
                <p className="cow-store-balance"><span aria-hidden="true"><Graphic symbol="coin"/></span> {moolah} Moolah</p>
            </div>

            <div className="cow-store-tabs" role="group" aria-label="Store category">
                {CATEGORIES.map((c) => (
                    <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                        <span aria-hidden="true"><Graphic symbol={c.emoji}/></span> {c.label}
                    </button>
                ))}
            </div>

            <ul className="cow-store-items">
                {items.map((item) => {
                    const isOwned = !item.consumable && owned.includes(item.id)
                    const statLabel = STATS.find((s) => s.id === item.stat).label
                    const statFull = item.consumable && stats[item.stat] >= STAT_MAX
                    return (
                        <li key={item.id} className="cow-store-item">
                            <span className="cow-store-art" aria-hidden="true">
                                {ART[item.id].image ? <img src={ART[item.id].image} alt=""/> : <Graphic symbol={item.id}/>}
                            </span>
                            <strong>{item.name}</strong>
                            <span className="cow-store-effect">+{item.boost} {statLabel}</span>
                            {headwear && ART[item.id].slot === "head" && (
                                <span className="cow-store-hidden">Hidden under her {headwear}</span>
                            )}
                            {isOwned ? (
                                <button className="cow-store-wear" aria-pressed={equipped.includes(item.id)} onClick={() => onToggleAccessory(item.id)}>
                                    {equipped.includes(item.id) ? "Wearing ✓" : "Put on"}
                                </button>
                            ) : (
                                <button className="cow-store-buy" onClick={() => handleBuy(item)} disabled={moolah < item.price || statFull}>
                                    {statFull ? `${statLabel} is full` : <>{item.consumable ? "Use" : "Buy"} · {item.price} <Graphic symbol="coin"/></>}
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
