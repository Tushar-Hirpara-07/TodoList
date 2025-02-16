const Task = require('../models/tasksModel');


// Get all tasks
const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};



// Create a new task
const createTask = async (req, res, next) => {
    try {
        const { taskName, taskStartDate, taskEndDate } = req.body;
        
        if (!taskName || !taskStartDate || !taskEndDate ) {
            return res.status(400).json({
                success: false,
                error: 'Task name, start date, and end date are required or not can be empty.'
            });
        }
        if(new Date(taskEndDate) < new Date(taskStartDate)){
            return res.status(400).json({
                success: false,
                error: 'End date is not valid'
            });
        }
        
        const task = await Task.create(req.body);
        
        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

// Update a task
const updateTask = async (req, res) => {
    let task = await Task.findById(req.params.id);

    if(new Date(req.body.taskEndDate) < new Date(req.bodytaskStartDate)){
        return res.status(400).json({
            success: false,
            error: 'End date is not valid'
        });
    }
    if (!task) {
        const error = new Error('Task not found');
        error.statusCode = 404;
        throw error;
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success: true,
        data: task
    });
};

// Delete a task
const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
        const error = new Error('Task not found');
        error.statusCode = 404;
        throw error;
    }
    
    await task.deleteOne();
    
    res.status(200).json({
        success: true,
        data: {}
    });
};



module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    
};