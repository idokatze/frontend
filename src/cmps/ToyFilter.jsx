import { useRef, useState, useEffect } from 'react'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'
import { ToySort } from './ToySort'

const toyLabels = toyService.getToyLabels()
export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({
        ...filterBy,
        txt: filterBy.txt || '',
        inStock: filterBy.inStock ?? false,
    })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'checkbox') {
            setFilterByToEdit((prevFilter) => ({
                ...prevFilter,
                [field]: target.checked,
            }))
        } else {
            setFilterByToEdit((prevFilter) => ({
                ...prevFilter,
                [field]: value,
            }))
        }
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <h3>Filter Toys</h3>
            <form onSubmit={onSubmitFilter} className="filter-form">
                <input
                    onChange={handleChange}
                    value={txt}
                    type="text"
                    name="txt"
                    placeholder="Search"
                />
                <label htmlFor="in-stock">
                    Show only toys in stock:
                    <input
                        type="checkbox"
                        name="inStock"
                        id="in-stock"
                        onChange={handleChange}
                        checked={filterByToEdit.inStock}
                    />
                </label>
            </form>
            <ToySort sortBy={filterBy.sortBy} onSetFilter={onSetFilter} />
        </section>
    )
}
