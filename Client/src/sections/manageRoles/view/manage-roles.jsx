import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';


import DataTable from 'react-data-table-component';


import axios from 'axios';


import { Box, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "",
  boxShadow: 24,
  p: 4,
};

const addUserStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "",
  boxShadow: 24,
  p: 4,
};

export default function manageRolesPage() {

  const [users, setUsers] = useState()
  const [roles, setRoles] = useState()
  const [viewUserModal, setViewUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false)
  const [userToBeUpdated, setUserToBeUpdated] = useState({})
  const [userToBeDeleted, setUserToBeDeleted] = useState();
  const [createUserModal, setCreateUserModal] = useState(false);
  const [openedUser, setOpenedUser] = useState({})
  const modulesAccess = [
    { allProducts: ['read', 'write', 'remove'] },
    { addUsers: ['write', 'remove'] },
    { manageRoles: ['write'] },
  ]
  const [modulesDetails, setModuleDetails] = useState()

  useEffect(() => {
    axios.get('http://localhost:5001/users').then((response) => {
      setUsers(response?.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5001/roles').then((response) => {
      setModuleDetails((response?.data?.map((item) => item?.role))?.map((user) => {
        return {
          [user]: [
            { allProducts: ['read', 'write', 'remove'] },
            { addUsers: ['write', 'remove'] },
            { ManageRoles: ['write'] }
          ]
        }
      }))

    })
  }, [])

  console.log(modulesDetails?.[0]?.admin,"final")
  /* EVENT HANDLERS STARTED*/
  const handleUpdate = (row) => {
    axios.get(`http://localhost:5001/users/${row?.id}`).then((response) => {
      setUserToBeUpdated(response?.data)
      handleOpen("updateUser")
    })
  }
  const handleView = (row) => {
    handleOpen("viewUser")
    axios.get(`http://localhost:5001/users/${row?.id}`).then((response) => {
      setOpenedUser(response?.data)
    })
  }


  const openDeleteUserModal = (row) => {
    setUserToBeDeleted(row)
    setDeleteUserModal(true)

  }
  const closeDeleteUserModal = (confirmDelete) => {
    if (confirmDelete) {
      console.log(userToBeDeleted, "&&")
      axios.delete(`http://localhost:5001/users/${userToBeDeleted?.id}`).then((response) => {
        setUsers(response?.data)
        toast.error("User Deleted ");
      })
    }
    setDeleteUserModal(false)
  }
  const handleOpen = (identifier) => {
    if (identifier == "viewUser") {
      setViewUserModal(true)
    }
    if (identifier == "CreateUser") {
      setCreateUserModal(true)
    }
    if (identifier == "updateUser") {
      setUpdateUserModal(true)
    }
  };
  const handleClose = (identifier) => {
    if (identifier == "viewUser") {
      setViewUserModal(false)
    }
    if (identifier == "CreateUser") {
      setCreateUserModal(false)
    }
    if (identifier == "updateUser") {
      setUpdateUserModal(false)
    }
  };


  const updateUser = (e) => {

    e.preventDefault()
    axios.put("http://localhost:5001/users", userToBeUpdated).then((res) => {
      try {
        setUpdateUserModal(false)
        console.log(res?.data?.users)
        setUsers(res?.data?.users)
        toast.success('User Updated Successfully')
      }
      catch (err) {
        console.log(err)
      }
    })


  }
  /* EVENT HANDLERS ENDED*/

  const modules = ['allProducts', 'addUsers', 'manageRoles']
  const actions = ['read', 'write', 'remove']





  /*  columns?.push(
     {
       name: 'ACTIONS',
       button: true,
       width: "250px",
       cell: row => <div className="flex gap-2">
         <Button
           variant="outlined"
           color="warning"
           onClick={() => handleUpdate(row)}
         >
           Update
         </Button>
      
         <Button
           variant="outlined"
           color="error"
           // onClick={() => handleDelete(row)}
           onClick={() => openDeleteUserModal(row)}
         >
           Delete
         </Button>
       </div>
     }) */


  const tempUsers = ['admin', 'employee']
  const usersList = ['admin', 'employee']
 console.log(modulesDetails)
  const columns = [
    {
      name: 'Users',
      selector: row => row.users,

    },
    {
      name: 'Modules',
      // selector: row => row.modules,
      button: true,
      width: "250px",
      cell: row => <div className="flex flex-col gap-4 py-4 text-sm font-semibold">
        {
          modules?.map((module, indx) => {
            return <div class="flex items-center mb-4" key={indx}>
              <input
                id={row?.users + indx}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={row?.users + indx} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{module}</label>
            </div>
          })
        }
      </div>
    },
    {
      name: 'Actions',
      selector: row => row.actions,
      button: true,
      width: "320px",
      cell: row => {
        return <div>
          {/*  {Array.from({ length: 3 }).map((item) => {

            return <div key={item}>

              <div className="flex gap-4 py-4 text-sm font-semibold">
                <div class="flex items-center mb-4">
                  <input
                    id={`read${item + row?.users}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`read${item + row?.users}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id={`write${item + row?.users}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`write${item + row?.users}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Write</label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id={`remove${item + row?.users}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`remove${item + row?.users}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remove</label>
                </div>


              </div>
              <br />
            </div>
          })} */}
          
        </div>
      }


    },

  ];

  const data = [
    {
      users: "admin",
    },
    {
      users: "employee",
    },
  ]

  const initialValues = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: ''
  }
  const { values, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues,
    onSubmit: () => {
      axios.post("http://localhost:5001/users", values).then(res => {
        setUsers(res?.data?.users)
        toast.success('User Created Successfully')
      }).catch((err) => {
        alert(err?.response?.data?.message)
      })
      setCreateUserModal(false)
      resetForm()

    }
  })

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Manage Roles</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleOpen("CreateUser")}
        >
          Add User
        </Button>
      </Stack>
      <DataTable
        columns={columns}
        data={data}
      />





      <div style={{ margin: "25%" }}>
        {/* VIEW PRODUCT */}
        <Modal
          open={viewUserModal}
          onClose={() => handleClose("viewUser")}
          aria-labelledby="modal-modal-email"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-email" variant="h6" component="h2" align='center'>
              {openedUser?.email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: "150px" }}
                  image={`${process.env.VITE_BACKEND_DOMAIN}${openedUser?.image}`}
                  email="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {openedUser?.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Typography>
          </Box>
        </Modal>

        {/* CREATE PRODUCT */}
        <Modal
          open={createUserModal}
          onClose={() => handleClose("CreateUser")}
          aria-labelledby="modal-modal-email"
          aria-describedby="modal-modal-description"
        >
          <Box sx={addUserStyle}>
            <div className=''>
              <Typography id="modal-modal-email" variant="h6" component="h2" align='center'>
                Create User
              </Typography>
              <br />


              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>


                <div>
                  <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                  <select
                    type="select"
                    name="role"
                    value={values?.role}
                    onChange={handleChange}
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                    <option value="" name="role" disabled></option>
                    <option value="admin" name="role" >Admin</option>
                    <option value="employee" name="role">Employee</option>
                  </select>
                </div>


                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create User</button>
              </form>

            </div>

          </Box>
        </Modal>


        {/* UPDATE USER */}
        <Modal
          open={updateUserModal}
          onClose={() => handleClose("updateUser")}
          aria-labelledby="modal-modal-email"
          aria-describedby="modal-modal-description"
        >
          <Box sx={addUserStyle}>
            <div className=''>
              <Typography id="modal-modal-email" variant="h6" component="h2" align='center'>
                Update User
              </Typography>
              <br />


              <form class="space-y-4 md:space-y-6" onSubmit={(e) => updateUser(e)}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    value={userToBeUpdated?.email}
                    onChange={(e) => setUserToBeUpdated({ ...userToBeUpdated, email: e.target.value })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                  <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                  <select
                    type="select"
                    name="role"
                    value={userToBeUpdated?.role}
                    onChange={(e) => setUserToBeUpdated({ ...userToBeUpdated, role: e.target.value })}
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                    <option value="" name="role" disabled></option>
                    <option value="admin" name="role" >Admin</option>
                    <option value="employee" name="role">Employee</option>
                  </select>
                </div>


                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create User</button>
              </form>

            </div>

          </Box>
        </Modal>



        {/* DELETE PRODUCT */}
        <Dialog
          open={deleteUserModal}
          onClose={closeDeleteUserModal}
          aria-labelledby="alert-dialog-email"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-email">
            {`Do you really want to Remove ${userToBeDeleted?.email}`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => closeDeleteUserModal(true)}>Yes</Button>
            <Button onClick={() => closeDeleteUserModal(false)} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        {/* TOAST CONTAINER */}
        <ToastContainer />

      </div>
    </Container>
  );
}