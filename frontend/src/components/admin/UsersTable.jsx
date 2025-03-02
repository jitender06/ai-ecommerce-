import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import axios from "axios";

const UsersTable = ({ users, fetchUsers, token }) => {
  const [viewUser, setViewUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleView = (user) => {
    setViewUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="mt-8">
      <Typography
        variant="h4"
        mb={3}
        className="text-4xl text-gray-900 dark:text-white font-semibold my-4 text-center"
      >
        User Management
      </Typography>
      <TableContainer
        component={Paper}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                Name
              </TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                Email
              </TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                Role
              </TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4 text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <TableCell className="text-gray-900 dark:text-white py-3 px-4">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                    {user.role}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        onClick={() => handleView(user)}
                        className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle className="text-gray-900 dark:text-white font-semibold text-center bg-white dark:bg-gray-800 py-3">
          User Details
        </DialogTitle>
        <DialogContent className="bg-white dark:bg-gray-800 p-6">
          {viewUser && (
            <Stack spacing={2}>
              <Typography className="text-gray-900 dark:text-white">
                <strong>Name:</strong> {viewUser.name}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> {viewUser.email}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300">
                <strong>Role:</strong> {viewUser.role}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300">
                <strong>Registered:</strong>{" "}
                {new Date(viewUser.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersTable;
