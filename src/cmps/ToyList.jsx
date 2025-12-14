import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <section className="toy-list-container grid">
            {toys.map((toy) => (
                <div className="toy-preview grid" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className='card-btns'>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </div>
            ))}
        </section>
    )
}
