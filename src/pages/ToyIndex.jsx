import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

import {
    loadToys,
    removeToy,
    removeToyOptimistic,
    saveToy,
    setFilterBy,
} from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector(
        (storeState) => storeState.toyModule.isLoading
    )

    useEffect(() => {
        const fetchToys = async () => {
            try {
                await loadToys()
            } catch (err) {
                showErrorMsg('Cannot load toys!')
            }
        }
        fetchToys()
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            console.log('Toy removed')
            // showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy')
            // showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        try {
            const savedToy = await saveToy(toyToSave)
            console.log(`Toy added id: ${savedToy._id}`)
            // showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            console.log('Cannot add toy')
            // showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        if (!price || price === 0) return

        const toyToSave = { ...toy, price }
        try {
            const savedToy = await saveToy(toyToSave)
            console.log('savedToy:', savedToy)
            console.log(`Toy updated to price: $${savedToy.price}`)
            // showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy')
            // showErrorMsg('Cannot update toy')
        }
    }

    return (
        <section className="toy-index grid">
            <h3>Toys App</h3>
            <button className="add-btn" onClick={onAddToy}>
                Add Random Toy
            </button>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {user && user.isAdmin && (
                <button style={{ alignSelf: 'center' }}>
                    <Link to="/toy/edit">Add Toy</Link>
                </button>
            )}
            <main>
                {!isLoading ? (
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        loggedInUser={user}
                    />
                ) : (
                    <div>Loading...</div>
                )}
                <hr />
            </main>
        </section>
    )
}
