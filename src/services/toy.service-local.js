
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

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

const toys = [
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
 
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => toys)
        //      => {
        //     if (!filterBy.txt) filterBy.txt = ''
        //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
        //     if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
        //     const regExp = new RegExp(filterBy.txt, 'i')
        //     return toys.filter(toy =>
        //         regExp.test(toy.vendor) &&
        //         toy.price <= filterBy.maxPrice &&
        //         toy.speed >= filterBy.minSpeed
        //     )
        // })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


