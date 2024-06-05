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
import Select from 'react-select'
import Iconify from 'src/components/iconify';


import DataTable from 'react-data-table-component';


import axios from 'axios';


import { Box, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const [modules, setModules] = useState()
  const [viewUserModal, setViewUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false)
  const [userToBeUpdated, setUserToBeUpdated] = useState({})
  const [userToBeDeleted, setUserToBeDeleted] = useState();
  const [createUserModal, setCreateUserModal] = useState(false);
  const [openedUser, setOpenedUser] = useState({})
  const modulesAccess = {
    allProducts: ['read', 'write', 'remove'],
    addUsers: ['write', 'remove'],
    ManageRoles: ['write']
  }

  const [modulesDetails, setModuleDetails] = useState()


  useEffect(() => {
    axios.get('http://localhost:5001/users').then((response) => {
      setUsers(response?.data)
    })
  }, [])

  /*  useEffect(() => {
     axios.get('http://localhost:5001/roles').then((response) => {
       setModuleDetails((response?.data?.map((item) => item?.role))?.map((user) => {
         return {
           [user]: {
             allProducts: { read: false, write: false, remove: false },
             addUsers: { write: false, remove: false },
             ManageRoles: { write: false }
           }
         }
       }))
 
     })
   }, []) */

  useEffect(() => {
    axios.get('http://localhost:5001/modules').then((response) => {
      let modules = response?.data?.map((data) => data?.module)
      // console.log(modules,"modules")
      setModules(modules)
    })
  }, [])
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

  /*   const modules = ['allProducts', 'addUsers', 'manageRoles']
    const actions = ['read', 'write', 'remove'] */

  /*  const isModuleChecked = (obj) => {
     let response = false
     let enteredObject = Object.keys(obj).map((key) => obj[key])?.filter((value) => value == true);
 
     if (enteredObject?.length > 0) {
       response = true
     }
     else {
       response = false
     }
     return response
   } */
  /*  const columns = [
     {
       name: 'Users',
       selector: row => row.users,
     },
     {
       name: 'Modules',
       button: true,
       width: "250px",
       cell: row => <div className="flex flex-col gap-4 py-4 text-sm font-semibold">
         {
           Object.keys(modulesAccess)?.map((module, indx) => {
             return <div className="flex items-center mb-4" key={indx}>
 
               <input
                 id={row?.users + indx}
                 type="checkbox"
                 value={module}
                 checked={modulesDetails?.length > 0 && isModuleChecked(modulesDetails?.find((module) => Object.keys(module)[0] == row?.users)?.[row?.users]?.[module])}
                 onChange={(e) => moduleHandler(e, row, module)}
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
 
           {
             Object?.keys(modulesAccess)?.map((module) => {
               return <div className='flex gap-4'>
                 {
                   modulesAccess?.[module]?.map((access, index) => {
                     return <div key={index} className="flex items-center mb-4 py-2 text-sm font-semibold">
 
                       <input
                         id={row?.users + module + access + index}
                         type="checkbox"
                         value={access}
                         checked={modulesDetails?.find((module) => Object.keys(module)[0] == row?.users)?.[row?.users]?.[module]?.[access]}
                         onChange={(e) => actionHandler(e, row, module, access)}
                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                       />
                       <label htmlFor={row?.users + module + access + index} className='mx-2'>{access}</label>
                     </div>
                   })
                 }
               </div>
 
             })
           }
 
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
   ] */

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

  const [roleDetails, setRoleDetails] = useState({
    role: '',
    modules: []
  })
  const actionHandler = (e, row, module, access) => {
    let checked = e.target.checked
    let user = row.users
    let modulesDetailsVariable = modulesDetails
    // console.log(module)
    if (checked) {
      modulesDetailsVariable.find((module) => Object.keys(module)[0] == user)[user][module][access] = true
    }
    else {
      modulesDetailsVariable.find((module) => Object.keys(module)[0] == user)[user][module][access] = false
    }
    setModuleDetails([...modulesDetailsVariable])
  }

  const moduleHandler = (e, row, module) => {
    let checked = e.target.checked
    let user = row.users
    let modulesDetailsVariable = modulesDetails
    let selectedModule = modulesDetailsVariable?.find((module) => Object.keys(module)[0] == user)?.[user]?.[module]
    if (checked) {
      for (let access in selectedModule) {
        selectedModule[access] = true
      }

    }
    else {
      for (let access in selectedModule) {
        selectedModule[access] = false
      }
    }
    setModuleDetails([...modulesDetailsVariable])
  }
  const handleSave = () => {
    let modulesDetailsVariable = modulesDetails
    /*     modulesDetailsVariable = modulesDetailsVariable?.map((user)=>{
          let UserName = Object.keys(user) 
          return {[UserName[0]] : {}}
        }) */

    modulesDetailsVariable = modulesDetailsVariable?.map((user) => {
      let UserName = Object.keys(user)
      /* if(isModuleChecked(user[UserName])) 
        {
            return {[UserName[0]] : {}}
        } */
      // return {[UserName[0]] : {}}
    })
    console.log(modulesDetails)
    // console.log(modulesDetails)
  }
  // { value: 'chocolate', label: 'Chocolate' },
  const options = modules?.map((item) => ({ value: item, label: item }))


  const modulesHandler = (e) => {
    let selectedModules = e?.map((item) => item?.value)
    let rolesDetailsVariable = roleDetails
    let modulesVariable = selectedModules?.map((item) => {
      return { [item]: { create: false, update: false, delete: false } }
    })

    rolesDetailsVariable.modules = modulesVariable
    /* selectedModules?.map((item)=>{
      if(!(rolesDetailsVariable?.modules?.find(o=> o[item])))
        {
          rolesDetailsVariable?.modules?.push({[item]:{create:false,update:false,delete:false}}) 
        }
    })
 */
    setRoleDetails({ ...rolesDetailsVariable })
  }
  const submitRole = (e) => {
    e.preventDefault()
    setCreateUserModal(false)
    
    console.log(roleDetails)
  }
  const roleDetailsActionHandler = (isChecked,module,action) =>{
      let rolesDetailsVariable = roleDetails 
      if(isChecked)
        {
            rolesDetailsVariable.modules.find((item)=>Object.keys(item)[0] == module)[module][action] = true
        }
          else{
            rolesDetailsVariable.modules.find((item)=>Object.keys(item)[0] == module)[module][action] = false
        }
      setRoleDetails({...rolesDetailsVariable})

    }
    const navigate = useNavigate()
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Manage Roles</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/addRole")}
        >
          Add Role
        </Button>
      </Stack>
      {/*  <DataTable
        columns={columns}
        data={data}
      /> */}
      <Box textAlign='center' marginTop='5rem'>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>





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

      
        


       

        {/* TOAST CONTAINER */}
        <ToastContainer />

      </div>
    </Container>
  );
}