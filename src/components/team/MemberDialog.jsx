import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

const MemberDialog = ({
  open,
  handleClose,
  addMember,
  updateMember,
  editingMember,
}) => {
  const initialState = {
    name: "",
    email: "",
    role: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingMember) {
      setFormData(editingMember);
    } else {
      setFormData(initialState);
    }
  }, [editingMember]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.role
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingMember) {
      updateMember(formData);
    } else {
      addMember(formData);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingMember ? "Edit Member" : "Add Member"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {editingMember ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;