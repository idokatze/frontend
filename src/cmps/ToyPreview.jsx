import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    const textColor = toy.inStock ? 'green' : 'red'
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>
                Price: <span>${toy.price.toLocaleString()}</span>
            </p>
            <p style={{ color: textColor }}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </p>
        </article>
    )
}
