import { useContext, useEffect, useState } from 'react';
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



import { useNavigate } from 'react-router-dom';
import { MyContext } from 'src/context/MyContext';


export default function manageRolesPage() {


  const [roles, setRoles] = useState([])
  const { user,setUser } = useContext(MyContext)
  useEffect(() => {
    axios.get('http://localhost:5001/roles',{headers: {  Authorization: `${user?.token}` }}).then((res) => {
      let rolesVariable = res?.data
      rolesVariable = rolesVariable?.map((data) => {
        return { ...data, module: JSON.parse(data?.module) }
      })
      setRoles(rolesVariable)
    })
  }, [])


  const navigate = useNavigate()
  const handleSave = () => {
    let modulesDetailsVariable = modulesDetails


    modulesDetailsVariable = modulesDetailsVariable?.map((user) => {
      let UserName = Object.keys(user)

    })
    // console.log(modulesDetails)

  }
  const handleDeleteRole = (row) => {
    // console.log(row, "datatobeDeleted")
    axios.delete(`http://localhost:5001/roles/${row?.id}`,{headers: {  Authorization: `${user?.token}` }}).then((response) => {
      // console.log(response, "res")
      axios.get('http://localhost:5001/roles',{headers: {  Authorization: `${user?.token}` }}).then((res) => {
        let rolesVariable = res?.data
        rolesVariable = rolesVariable?.map((data) => {
          return { ...data, module: JSON.parse(data?.module) }
        })
        // console.log(rolesVariable)
        setRoles(rolesVariable)
      })
    }).catch((err)=>{
      toast.error(err?.response?.data)
    })
  }
  const columns = [
    {
      name: 'Role',
      selector: row => row.role,
    },
    {
      name: 'Action',
      button: true,
      width: "250px",
      cell: row => <div className="flex gap-2">
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate(`/updateRole/${row?.id}`)}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteRole(row)}
        >
          Delete
        </Button>
      </div>
    },
    {
      name: 'ID',
      selector: row => row.id,
      omit: true
    }
  ];

  let rolesForDataTable = (roles.length > 0) && (roles?.map((data) => ({ role: data?.role, id: data?.id })))
  const data = rolesForDataTable



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


      <DataTable
        columns={columns}
        data={data}
      />

    <ToastContainer/>
    </Container>
  );
}