import { useState } from 'react'
import { useEffectUpdate } from '../hooks/useEffectUpdate'

export function ToySort({ sortBy, onSetFilter }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })
    useEffectUpdate(() => {
        onSetFilter({ sortBy: sortByToEdit })
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setSortByToEdit((prevSort) => ({
            ...prevSort,
            [field]: field === 'sortDir' ? -prevSort.sortDir : value,
        }))
    }

    return (
        <form className="toy-sort">
            <select
                name="sortType"
                value={sortByToEdit.type}
                onChange={handleChange}
            >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date Added</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="sortDir"
                    checked={sortByToEdit.sortDir < 0}
                    onChange={handleChange}
                    disabled={!sortByToEdit.sortType}
                />
                <span>Descending</span>
            </label>
        </form>
    )
}
