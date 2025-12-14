import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

const hardcodedToys = [
    {
        _id: 't101',
        name: 'Talking Doll',
        imgUrl: 'hardcoded-url-for-now',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    },
    {
        _id: 't102',
        name: 'Puzzle Cube',
        imgUrl: 'hardcoded-url-for-now',
        price: 45,
        labels: ['Puzzle', 'Box game'],
        createdAt: 1631032801011,
        inStock: false,
    },
    {
        _id: 't103',
        name: 'Art Kit',
        imgUrl: 'hardcoded-url-for-now',
        price: 75,
        labels: ['Art', 'Box game'],
        createdAt: 1631033801011,
        inStock: true,
    },
    {
        _id: 't104',
        name: 'Baby Rattle',
        imgUrl: 'hardcoded-url-for-now',
        price: 20,
        labels: ['Baby'],
        createdAt: 1631034801011,
        inStock: true,
    },
    {
        _id: 't105',
        name: 'Remote Car',
        imgUrl: 'hardcoded-url-for-now',
        price: 150,
        labels: ['On wheels', 'Outdoor', 'Battery Powered'],
        createdAt: 1631035801011,
        inStock: true,
    },
]

const toyNames = [
    'Talking Doll',
    'Puzzle Cube',
    'Art Kit',
    'Baby Rattle',
    'Remote Car',
    'Magic Blocks',
    'Robot Buddy',
    'Race Track',
    'Coloring Set',
]

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getToyLabels,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL + (toy._id || ''), toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        createdAt: Date.now(),
        labels: _getRandomLabels(),
    }
}

function getRandomToy() {
    return {
        name: toyNames[utilService.getRandomInt(0, toyNames.length)],
        createdAt: Date.now(),
        labels: _getRandomLabels(),
        price: utilService.getRandomIntInclusive(10, 200),
        inStock: Math.random() < 0.5,
        imgUrl: '',
    }
}

function getDefaultFilter() {
    // TODO refactor
    return {
        txt: '',
        maxPrice: '',
        inStock: false,
        sortBy: { type: '', sortDir: 1 },
    }
}

function _getRandomLabels() {
    const shuffledLabels = [...labels].sort(() => Math.random() - 0.5)
    const randomLabels = shuffledLabels.slice(0, 2)
    return randomLabels
}

function getToyLabels() {
    return [...labels]
}
