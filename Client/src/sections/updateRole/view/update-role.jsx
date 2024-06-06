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
import axios from 'axios';
import { useFormik } from 'formik';
import { Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';



export default function updateRolePage() {


  const [role,setRole] = useState()
  const [modulesForDataTable, setModulesForDataTable] = useState([]);
 
 
  useEffect(() => {
    axios.get('http://localhost:5001/modules').then((res) => {
      let modulesVariable = res?.data?.map((item) => {
        return item?.module
      })
      let modulesForForm =  modulesVariable?.map((module) => ({ [module]: { create: false, update: false, delete: false } }))
      setModulesForDataTable(modulesVariable)
    })
  }, [])
    
 

  let id = useParams()?.id



  const initialValues = {
    id:'',
    role: '',
    modules: []
  }
  const {values,setFieldValue,handleChange,handleSubmit} = useFormik({
      initialValues,
      onSubmit: (value,action) => {
        axios.put('http://localhost:5001/roles',values).then((res) => {
          alert(`${role?.role} Updated...!!`)
        })    

      
      }
  })
  useEffect(()=>{
    axios.get(`http://localhost:5001/roles/${id}`).then((response) => {
      let roleVariable = response?.data
      roleVariable = {...roleVariable,module:JSON.parse(roleVariable?.module)} 
      setRole(roleVariable)
      setFieldValue('id',roleVariable?.id)
      setFieldValue('modules',roleVariable?.module)
      setFieldValue('role',roleVariable?.role)
    })
  },[])
  console.log(values)  
  const columns = [
    {
      name: 'Modules',
      selector: row => row.modules,
    },
    {
      name:'Create',
      button: true,
		  cell: (row,index) => {
       
        return(<div>
        <input 
              type="checkbox"  
              className='h-[1rem] w-[1rem]'
              name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.create`}
              value={values?.modules?.[index]?.[row['modules']]?.create}
              // checked={ values?.modules?.[index]?.[row['modules']]?.create }
              checked={ values?.modules?.[index]?.[row['modules']]?.create }
              onChange={handleChange}
        />
        
      </div>)},
    },
    {
      name:'Update',
      button: true,
		  cell:  (row,index) => <>
        <input 
            type="checkbox" 
            className='h-[1rem] w-[1rem]'
            name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.update`}
            value={values?.modules?.[index]?.[row['modules']]?.update}
            checked={ values?.modules?.[index]?.[row['modules']]?.update }
            onChange={handleChange}
        />
      </>,
    },
    {
      name:'Delete',
      button: true,
		  cell:  (row,index) => <>
        <input 
              type="checkbox"  
              className='h-[1rem] w-[1rem]'
              name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.delete`}
              value={values?.modules?.[index]?.[row['modules']]?.delete}
              checked={ values?.modules?.[index]?.[row['modules']]?.delete }
              onChange={handleChange}
        />
      </>,
    },
  ];
  
  const data = modulesForDataTable?.map((item)=>({modules:item}))
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Update Role</Typography>

      {/*   <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleOpen("CreateUser")}
        >
          Update Role
        </Button> */}
      </Stack>
      <Box>
        <form  onSubmit={handleSubmit} className='border '>
                <TextField 
                  id="outlined-basic" 
                  label="Enter Role" 
                  variant="outlined"
                  name='role' 
                  value={values?.role}
                  onChange={handleChange}
                  required
                />
                
              <DataTable columns={columns} data={data} />
              <button 
                    type="submit" 
                    className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
        </form>
      </Box>
     
    </Container>
  );
}