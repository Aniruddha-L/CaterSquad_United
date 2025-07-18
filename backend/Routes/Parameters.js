import express from 'express'
import { Parameter } from '../Schema.js'

const ParameterRouter = express.Router()

ParameterRouter.post('/', async(req, res)=>{
    let {date, engoil, coolant, hydra, transmission} = req.body

    if (!date || !engoil || !coolant || !hydra || !transmission) return res.status(403).json({"msg":"Missing req fields"});
    date = new Date(date).toISOString().split("T")[0]
    console.log(date)
    try {
        const lastItem = await Parameter.findOne().sort({ _id: -1 }); // Get the one with highest _id
        const lastId = lastItem ? lastItem._id + 1 : 1;
        let newData = {
            _id:lastId,
            Date:date,
            EngOil:engoil,
            Coolant:coolant,
            Hydraullic:hydra,
            Transmission:transmission
        }
        console.log(newData.Date)
        newData = new Parameter(newData)
        await newData.save()
        return res.status(200).json({"msg":"Data added successfully"})
    } catch (error) {
        return res.status(500).json({msg:"Error in adding data"})
    }
})

ParameterRouter.get('/', async(req, res)=>{
    try {
        const data = await Parameter.find({})
        if (!data) return res.status(405).json({"msg":"No data is present"});
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({msg:"Error in fetching data"})
    }
})

ParameterRouter.get('/date', async(req, res)=>{
    let date = req.body.date
    date = new Date(date)
    console.log(date)
    try {
        const data = await Parameter.find({Date:date})
        if (!data) return res.status(401).json({"msg":"Unable to find data"});
        return res.status(200).json({"msg":data})
    } catch (error) {
        return res.status(500).json({"msg":"Error in fetching data"})
    }
})

export default ParameterRouter