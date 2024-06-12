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
import Cookies from 'js-cookie';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { useFormik } from 'formik';
import { Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { omit } from 'lodash';
import { isModuleChecked  } from 'src/utils/HelperFunctions';
import { MyContext } from 'src/context/MyContext';


export default function updateRolePage() {


  const [role, setRole] = useState()
  const [modulesForDataTable, setModulesForDataTable] = useState([]);
  const { user,setUser } = useContext(MyContext)




  let id = useParams()?.id



  const initialValues = {
    id: '',
    role: '',
    modules: []
  }
  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (value, action) => {
      axios.put('http://localhost:5001/roles', values ,{headers: {  Authorization: `${user?.token}` }}).then((res) => {
        // alert(`${role?.role} Updated...!!`)

        // console.log(res?.data,"Roles Details")
        // let existingCookie =  user
        // console.log(user,"COOKIES")
        
        // Cookies.set('user',JSON.stringify({...existingCookie,access:res?.data}))
        
        toast.success('Role Updated...!')
      }).catch((err)=>{
        toast.error(err?.response?.data)
      })


    }
  })
  useEffect(() => {
    axios.get(`http://localhost:5001/roles/${id}`,{headers: {  Authorization: `${user?.token}` }}).then((response) => {
      let roleVariable = response?.data
      roleVariable = { ...roleVariable, module: JSON.parse(roleVariable?.module) }
      setRole(roleVariable)
      setFieldValue('id', roleVariable?.id)
      setFieldValue('modules', roleVariable?.module)
      setFieldValue('role', roleVariable?.role)

     
        let modulesVariable = roleVariable?.module?.map((item)=>(Object.keys(item)[0]))
       
        setModulesForDataTable(modulesVariable)
    }).catch((err)=>{
      toast.error(err?.response?.data)
    })
  }, [])






  const handleModuleCheck = (e,row,inx) =>{
      let checked = e.target.checked
      let module = row?.modulesName
      let index = inx
      let modules = values?.modules

      if(checked){
        modules[index][module] = {create:true,delete:true,update:true}
        }
        else{
        modules[index][module] = {create:false,delete:false,update:false}
      }

      setFieldValue('modules',modules)
  }

  const columns = [
    {
      name: 'Modules',
      button: true,
      width:'250px',
      cell: (row, index) => {
       
        return (<div>
          {
            <div className="flex items-center mb-4">
                    <input 
                            id={values?.modules?.[index]} 
                            type="checkbox" 
                            // value={isModuleChecked(values?.modules?.[index]?.[row['modulesName']])} 
                            checked={isModuleChecked( isModuleChecked(values?.modules?.[index]?.[row['modulesName']]) )}
                            name={`modules${index}`}
                            onChange={(e)=>handleModuleCheck(e,row,index)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                          htmlFor={modulesForDataTable[index]} 
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                          {modulesForDataTable[index]}
                    </label>
                </div>
            
          }
         

        </div>)
      }
    },
    {
      name: 'Create',
      button: true,
      cell: (row, index) => {
        return (<div>
          <input
            type="checkbox"
            className='h-[1rem] w-[1rem]'
            name={`modules[${index}].${[row['modulesName']]}.create`}
            // name={`modules[${index}].${[modulesForDataTable?.[index]]}.create`}
            value={values?.modules?.[index]?.[row['modulesName']]?.create}
            // value={values?.modules?.[index]?.[modulesForDataTable?.[index]]?.create}
            checked={ values?.modules?.[index]?.[row['modulesName']]?.create }
            // checked={ values?.modules?.[index]?.[modulesForDataTable?.[index]]?.create }
            onChange={handleChange}
          />

        </div>)
      },
    },
    {
      name: 'Update',
      button: true,
      cell: (row, index) => <>
        <input
          type="checkbox"
          className='h-[1rem] w-[1rem]'
          name={`modules[${index}].${[row['modulesName']]}.update`}
          value={values?.modules?.[index]?.[row['modulesName']]?.update}
          checked={values?.modules?.[index]?.[row['modulesName']]?.update}
          onChange={handleChange}
        />
      </>,
    },
    {
      name: 'Delete',
      button: true,
      cell: (row, index) => <>
        <input
          type="checkbox"
          className='h-[1rem] w-[1rem]'
          name={`modules[${index}].${[row['modulesName']]}.delete`}
          value={values?.modules?.[index]?.[row['modulesName']]?.delete}
          checked={values?.modules?.[index]?.[row['modulesName']]?.delete}
          onChange={handleChange}
        />
      </>,
    },
    {
      name:'ModulesName',
      selector: row => row.modulesName,
      omit:true
    }
  ];

  const data = modulesForDataTable?.map((module)=>({modulesName:module}))
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Update Role</Typography>

      
      </Stack>
      <Box>
        <form onSubmit={handleSubmit} className='border '>
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
      <ToastContainer/>
    </Container>
  );
}