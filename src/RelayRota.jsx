import PersonChip from './PersonChip'
import './RelayRota.css'

// { group } is everyone in the relay (you first). { rota } comes from relayWeeks.
// { dates } labels each week. { faces } maps a person's id to their avatar props.
function RelayRota({ group, rota, dates, faces }) {
    return (
        <div className="relay-rota">
            <table>
                <thead>
                    <tr>
                        <th scope="col"><span className="visually-hidden">Person</span></th>
                        {dates.map((date) => <th key={date} scope="col">{date}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {group.map((id) => (
                        <tr key={id}>
                            <th scope="row"><PersonChip id={id} face={faces[id]}/></th>
                            {rota.map((going, week) => (
                                <td key={dates[week]}>
                                    {going.includes(id)
                                        ? <span className="relay-rota-go">Goes</span>
                                        : <span className="relay-rota-rest">Rest</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RelayRota
