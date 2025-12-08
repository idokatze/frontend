import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service-local.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector(
        (storeState) => storeState.toyModule.isLoading
    )

    useEffect(() => {
        loadToys().catch((err) => {
            showErrorMsg('Cannot load toys!')
        })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                console.log('Toy removed')
                // showSuccessMsg('Toy removed')
            })
            .catch((err) => {
                console.log('Cannot remove toy')
                // showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log(`Toy added (id: ${savedToy._id}`)
                // showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch((err) => {
                console.log('Cannot remove toy')
                // showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                console.log(`Toy updated to price: $${savedToy.price}`)
                // showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch((err) => {
                console.log('Cannot update toy')
                // showErrorMsg('Cannot update toy')
            })
    }

    return (
        <section>
            <h3>Toys App</h3>
            <main>
                {/* <Link to="/car/edit">Add Car</Link> */}
                <button className="add-btn" onClick={onAddToy}>
                    Add Random Toy
                </button>
                {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                {!isLoading ? (
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                ) : (
                    <div>Loading...</div>
                )}
                <hr />
            </main>
        </section>
    )
}
