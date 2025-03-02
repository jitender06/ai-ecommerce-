import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Stack,
  Button,
  TablePagination,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import Sidebar from "../../components/admin/Sidebar";
import AdminTopBar from "../../components/admin/AdminTopBar";

function ExchangeRequests() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [requests, setRequests] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    const handleResize = () => setIs480(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    fetchRequests();
    return () => window.removeEventListener("resize", handleResize);
  }, [token, user, navigate, page, rowsPerPage]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/exchange/requests`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit: rowsPerPage, page: page + 1 },
        }
      );
      setRequests(response.data.requests);
      setTotalRequests(response.data.total);
    } catch (error) {
      console.error("Error fetching exchange requests:", error);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    if (
      !window.confirm(
        `Are you sure you want to ${status} this exchange request?`
      )
    )
      return;
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/exchange/requests/${requestId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
      alert(`Exchange request ${status} successfully`);
    } catch (error) {
      console.error(`Error updating exchange request to ${status}:`, error);
      alert(`Failed to update exchange request`);
    }
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        location={location}
        is480={is480}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <AdminTopBar handleSidebarToggle={handleSidebarToggle} is480={is480} />

        {/* Exchange Requests Content */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          <Typography
            variant="h4"
            className="text-gray-900 dark:text-white font-bold mb-6 text-center"
          >
            Exchange Requests
          </Typography>
          <TableContainer
            component={Paper}
            className="mt-14 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50 dark:bg-gray-700">
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    Product
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    User
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    Image
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    Description
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    Amount
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    WhatsApp
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4">
                    Status
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 font-medium py-3 px-4 text-center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-500 dark:text-gray-400 py-6"
                    >
                      No exchange requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow
                      key={request._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <TableCell className="text-gray-900 dark:text-white py-3 px-4">
                        {request.productId.name}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        {request.userId.name} ({request.userId.email})
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <a
                          href={`http://localhost:5000/${request.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`http://localhost:5000/${request.image}`}
                            alt="Exchange Item"
                            className="w-16 h-16 object-cover rounded-md cursor-pointer"
                          />
                        </a>
                      </TableCell>

                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        {request.description}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        ₹{request.amount}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        {request.whatsapp}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 py-3 px-4">
                        {request.status}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          {request.status === "pending" && (
                            <>
                              <IconButton
                                onClick={() =>
                                  handleStatusUpdate(request._id, "approved")
                                }
                                className="text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400"
                              >
                                <ThumbUp fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleStatusUpdate(request._id, "rejected")
                                }
                                className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400"
                              >
                                <ThumbDown fontSize="small" />
                              </IconButton>
                            </>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRequests}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ExchangeRequests;
