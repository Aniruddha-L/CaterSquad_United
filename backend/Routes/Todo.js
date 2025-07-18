import express from "express"
import {todo} from "../Schema.js";

const TodoRouter = express.Router()

TodoRouter.post("/new", async(req, res)=>{
    if (!req.body.detail || !req.body.date || !req.body.status || !req.body.Username) return res.status(403).json({"msg":"Missing fields"});
    try {
        const lastItem = await todo.findOne().sort({ _id: -1 }); // Get the one with highest _id
        const lastId = lastItem ? lastItem._id + 1 : 1;

        const newTodo = {
            _id:lastId,
            Detail:req.body.detail,
            Date:req.body.date,
            Status:req.body.status,
            Username:req.body.Username
        }
        console.log(newTodo)
        const newtodo = new todo(newTodo)
        await newtodo.save()
        return res.status(200).json({"msg":"New Todo saved"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"msg":error})
    }
})

TodoRouter.get('/test', async(req, res)=>{
    try {
        const data = await todo.find({})
        // console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({"msg":error})
    }
})

TodoRouter.put('/updateStatus/:id/:option', async(req, res)=>{
    const id = parseInt(req.params.id)
    const opt = parseInt(req.params.option) // 1 -> task persistent, 0 -> delete
    // console.log(`${id} -> ${typeof id} \n ${opt} -> ${typeof opt}`)
    try {
        const task = await todo.findById(id)
        // console.log(task.length)
        if (!task){
            return res.status(401).json("task not found")
        }
        console.log(task)
        if (opt === 0) {
        // Mark as completed or remove (based on your design)
        task.Status = "Completed";
        } else {
        // Cycle through statuses
        if (task.Status === "Not Started") task.Status = "Started";
        else if (task.Status === "Started") task.Status = "pending";
        else if (task.Status === "pending") task.Status = "Not Started";
        }


        console.log("After")
        await task.save()
        return res.status(200).json({"msg":"Task Updated successfully"})
    } catch (error) {
        return res.status(500).json({"msg":error})
    }
})

TodoRouter.get('/pending', async(req, res)=>{
    try {
        const data = await todo.find({Status:{$ne :"Completed"}});
        if(data.length === 0) return res.status(400).json("All tasks are completed or there is no task in the db");
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({"msg":"Unable to find data"})
    }
})

// DELETE: Remove a todo by ID
TodoRouter.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.status(200).json({ msg: "Todo deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    return res.status(500).json({ msg: "Internal server error during delete" });
  }
});
TodoRouter.put("/update/:id", async (req, res) => {
  try {
    const updated = await todo.findByIdAndUpdate(
      req.params.id,
      {
        Detail: req.body.Detail,
        Date: req.body.Date,
        Status: req.body.Status,
        Username: req.body.Username,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Todo not found" });
    return res.status(200).json({ msg: "Todo updated successfully" });
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


export default TodoRouter