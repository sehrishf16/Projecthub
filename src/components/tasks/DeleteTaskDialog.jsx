import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteTaskDialog = ({
  open,
  handleClose,
  handleDelete,
  taskTitle,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Task</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{taskTitle}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;