import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import Iconify from 'src/components/iconify';


import DataTable from 'react-data-table-component';

import axios from 'axios';

import { Box, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { omit } from 'lodash';
import { MyContext } from 'src/context/MyContext';
import { isAccessAllowed } from 'src/utils/HelperFunctions';

// ----------------------------------------------------------------------


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

const addProductStyle = {
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


export default function ModulesPage() {


  const [products, setProducts] = useState()
  const [viewProductModal, setViewProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false)
  const [productToBeUpdated, setProductToBeUpdated] = useState({})
  const [moduleToBeDeleted, setModuleToBeDeleted] = useState();
  const [createProductModal, setCreateProductModal] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({})
  const [previewUrl, setPreviewUrl] = useState(null)
  const [modules, setModules] = useState()
  const { user,setUser } = useContext(MyContext)
  useEffect(() => {
    axios.get('http://localhost:5001/modules',{headers: {  Authorization: `${user?.token}` }}).then((response) => {
      setModules(response?.data)
    })
  }, [])



  /* EVENT HANDLERS STARTED*/
  const handleUpdate = (row) => {
    axios.get(`http://localhost:5001/products/${row?.id}`,{headers: {  Authorization: `${user?.token}` }}).then((response) => {
      setProductToBeUpdated(response?.data)
    })
    handleOpen("updateProduct")
  }
  const handleView = (row) => {
    handleOpen("viewProduct")
    axios.get(`http://localhost:5001/products/${row?.id}`,{headers: {  Authorization: `${user?.token}` }}).then((response) => {
      setOpenedProduct(response?.data)
    })
  }


  const handleDeleteModule = (row) => {
    setModuleToBeDeleted(row)
    setDeleteProductModal(true)

  }
  const closeDeleteProductModal = (confirmDelete) => {
    if (confirmDelete) {
      axios.delete(`http://localhost:5001/modules/${moduleToBeDeleted?.id}`,{headers: {  Authorization: `${user?.token}` }}).then((response) => {
        setModules(response?.data)
        toast.error("Product Deleted ");
      }).catch((err)=>{
        toast.error(err?.response?.data)
      })
    }
    setDeleteProductModal(false)
  }
  const handleOpen = (identifier) => {
    if (identifier == "viewProduct") {
      setViewProductModal(true)
    }
    if (identifier == "CreateProduct") {
      setCreateProductModal(true)
    }
    if (identifier == "updateProduct") {
      setUpdateProductModal(true)
    }
  };
  const handleClose = (identifier) => {
    if (identifier == "viewProduct") {
      setViewProductModal(false)
    }
    if (identifier == "CreateProduct") {
      setCreateProductModal(false)
    }
    if (identifier == "updateProduct") {
      setUpdateProductModal(false)
    }
  };

  const updateProduct = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', productToBeUpdated?.id)
    formData.append('title', productToBeUpdated?.title)
    formData.append('price', productToBeUpdated?.price)
    formData.append('description', productToBeUpdated?.description)
    formData.append('category', productToBeUpdated?.category)
    formData.append('image', productToBeUpdated?.image)
    formData.append('stock', productToBeUpdated?.stock)


    axios.put("http://localhost:5001/products", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
      try {
        setUpdateProductModal(false)
        setProducts(res?.data?.product)
        toast.success('Product Updated Successfully')
      }
      catch (err) {
        console.log(err)
      }
    }).catch((err)=>{
      toast.error(err?.response?.data)
    })


  }







  const initialValues = {
    module: ''
  }

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues,
    onSubmit: async() => {
      await axios.post('http://localhost:5001/modules', values ,{headers: {  Authorization: `${user?.token}` }}).then((res) => {
        if (res.status == 200) {
          toast.success(res?.data)
        }
        else {
          toast.error(res?.data)
        }
      }).catch((err)=>{
        toast.error(err?.response?.data)
      })

      await axios.get('http://localhost:5001/modules',{headers: {  Authorization: `${user?.token}` }}).then((response) => {
        setModules(response?.data)
        setCreateProductModal(false)
        resetForm()
      })
     

    }
  })

  const columns = [
    {
      name: 'Modules',
      selector: row => row.module,
    },
    {
      name:'Id',
      selector:row => row.id,
      omit:true
    }
  ];
  if(isAccessAllowed('Manage Module', 'delete'))

    {
      columns?.push( {
        name: 'ACTIONS',
        button: true,
        width: "250px",
        cell: row => <div className="flex gap-2">
  
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteModule(row)}
          >
            Delete
          </Button>
        </div>
      })
    }
  const data = modules


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Manage Module</Typography>
        {
              isAccessAllowed('Manage Module', 'delete') ?
              <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => handleOpen("CreateProduct")}
            >
              Add Module
            </Button>
            :
            null
        }
        
      </Stack>

      <DataTable
        columns={columns}
        data={data}
      />


      <div style={{ margin: "25%" }}>

        {/* CREATE MODULE */}
        <Modal
          open={createProductModal}
          onClose={() => handleClose("CreateProduct")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={addProductStyle}>
            <div className=''>
              <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                Create Module
              </Typography>
              <br />


              <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="module" onChange={handleChange} value={values?.module} id="module" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                  <label htmlFor="module" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Module</label>
                </div>


                <button type="submit" className="ms-[40%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
              </form>

            </div>

          </Box>
        </Modal>


        {/* DELETE Module */}
        <Dialog
          open={deleteProductModal}
          onClose={closeDeleteProductModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to Delete an Product "}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => closeDeleteProductModal(true)}>Yes</Button>
            <Button onClick={() => closeDeleteProductModal(false)} autoFocus>
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
