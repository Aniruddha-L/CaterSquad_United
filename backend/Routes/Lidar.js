import express from 'express'

const Lidar = express.Router()

const RandInt = (min, max)=>{
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Lidar.get('/', (req, res)=>{
    const values = {"Left":RandInt(0, 10), "Right":RandInt(1, 10), "Front":RandInt(1, 10), "Bag":RandInt(1, 10)}
    return res.status(200).json(values)
})

export default Lidar