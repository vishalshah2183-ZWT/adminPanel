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




/* const initialValues = {
  role:'',
  modules:[]
} */
export default function addRolePage() {
  const [modules, setModules] = useState([]);
  
  const initialValues = {
    role: "",
    // modules: modules.length > 0 ? ( modules?.map((module) => ({ [module]: { create: false, update: false, delete: false } })) ) : []
    modules:  []
  }
  
  
  
  const { values, handleSubmit ,handleChange,setFieldValue} = useFormik({
    initialValues,
    onSubmit: (value,action) => {
      axios.post('http://localhost:5001/roles',values).then((res) => {
        console.log(res.data)
      })    
    }
  })


  useEffect(() => {
    axios.get('http://localhost:5001/modules').then((res) => {
      let modulesVariable = res?.data?.map((item) => {
        return item?.module
      })
      setModules(modulesVariable)
      let modulesForForm =  modulesVariable?.map((module) => ({ [module]: { create: false, update: false, delete: false } }))
      setFieldValue('modules',modulesForForm)
    })
  }, [])



  

  const columns = [
    {
      name: 'Modules',
      selector: row => row.modules,
    },
    {
      name:'Create',
      button: true,
		  cell: row => <>
        <input 
              type="checkbox"  
              className='h-[1rem] w-[1rem]'
              name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.create`}
              value={values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)?.row?.modules?.create}
              onChange={handleChange}
        />
      </>,
    },
    {
      name:'Update',
      button: true,
		  cell: row => <>
        <input 
            type="checkbox" 
            className='h-[1rem] w-[1rem]'
            name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.update`}
            value={values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)?.row?.modules?.update}
            onChange={handleChange}
        />
      </>,
    },
    {
      name:'Delete',
      button: true,
		  cell: row => <>
        <input 
              type="checkbox"  
              className='h-[1rem] w-[1rem]'
              name={`modules.${values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)}.${row?.modules}.delete`}
              value={values?.modules?.findIndex((item)=>Object.keys(item)[0] == row?.modules)?.row?.modules?.delete}
              onChange={handleChange}
        />
      </>,
    },
  ];
  
  const data = modules?.map((item)=>({modules:item}))
  
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Add Role</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        // onClick={() => Navigate('/addRole')}
        >
          Add Role PAGE
        </Button>
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
                Add
              </button>
        </form>
      </Box>
    </Container>
  );
}