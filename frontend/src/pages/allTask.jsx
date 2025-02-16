import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-in";  
import {
  Switch,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  DialogContentText,
} from "@mui/material";
import dayjs from "dayjs";

export default function AllTask() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const[error,setError]=useState('')
  const [allTasks, setAllTasks] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    taskStartDate: null,
    taskEndDate: null,
    taskStatus: false,
    taskNote: "",
  });

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("http://localhost:7000/tasks");
        setAllTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchAllTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? date.toISOString() : dayjs(),
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, taskStatus: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    try {
      if (isEditing) {
        const response =await axios.put(
          `http://localhost:7000/tasks/${selectedTask._id}`,
          formData
        );
        setAllTasks(allTasks.map(task => 
          task._id === selectedTask?._id ? response.data.data : task
        ));
      } else {
        const response=await axios.post("http://localhost:7000/tasks", formData);
        setAllTasks([...allTasks, response.data.data]);
      }
      setOpen(false);
    } catch (error) {
      setError(error.response.data.error)
    } 
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:7000/tasks/${taskId}`);
      setAllTasks(allTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error on prerform deleting task:", error);
    }
  };
  const handleClickOpen = (task = null) => {
    setOpen(true);
    setError('')
    if (task) {
      setIsEditing(true);
      setSelectedTask(task);
      setFormData({ ...task });
    } else {
      setIsEditing(false);
      setSelectedTask(null);
      setFormData({
        taskName: "",
        taskStartDate: null,
        taskEndDate: null,
        taskStatus: false,
        taskNote: "",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>All Tasks</h1>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => handleClickOpen()}
        sx={{ marginY: 2, display: "flex", marginLeft: "auto" }}
      >
        Add New Task
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="center">Task Name</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Notes</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTasks.map((task, index) => (
              <TableRow key={task._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell align="center">
                  {dayjs(task.taskStartDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">
                  {dayjs(task.taskEndDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">
                  {task.taskStatus ? "Complete" : "Incomplete"}
                </TableCell>
                <TableCell align="center">{task.taskNote}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditNoteIcon />}
                    onClick={() => handleClickOpen(task)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon fontSize="large" />}
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Update Task" : "Add Task"}</DialogTitle>
        <DialogContentText sx={{ color: "red", textAlign: "center" }}>{error || ""}</DialogContentText>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Name"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            required={true}
            margin="dense"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              value={
                formData.taskStartDate ? dayjs(formData.taskStartDate) :null
              }
              onChange={(date) => handleDateChange("taskStartDate", date)}
              renderInput={(params) => (
                <TextField fullWidth {...params} margin="dense" />
              )}
            />
            <DesktopDatePicker
              label="End Date"
              value={formData.taskEndDate ? dayjs(formData.taskEndDate) : null}
              onChange={(date) => handleDateChange("taskEndDate", date)}
              renderInput={(params) => (
                <TextField fullWidth {...params} margin="dense" />
              )}
            />
          </LocalizationProvider>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <OutlinedInput
              readOnly
              value={formData.taskStatus ? "Complete" : "Incomplete"}
              endAdornment={
                <Switch
                  checked={formData.taskStatus}
                  onChange={handleStatusChange}
                />
              }
            />
          </FormControl>
          <TextField
            fullWidth
            label="Notes"
            name="taskNote"
            value={formData.taskNote}
            onChange={handleChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
