const mongoose=require('mongoose')

const taskSchema= new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
    },
    taskNote:{
        type:String,
    },
    taskStartDate:{
        type:Date,
        required:true
    },
    taskEndDate:{
        type:Date,
        required:true
    },
    taskStatus:{
        type:Boolean,
        default:false
    },

},
{timestamps:true}
)

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;