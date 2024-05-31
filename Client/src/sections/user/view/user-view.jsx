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
import Scrollbar from 'src/components/scrollbar';

import DataTable from 'react-data-table-component';
// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import axios from 'axios';
import { object } from 'prop-types';
import { imagefrombuffer } from "imagefrombuffer";
import { Box, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
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
export default function UserPage() {
  /* const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName; */






  const [products, setProducts] = useState()
  const [viewProductModal, setViewProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false)
  const [productToBeUpdated, setProductToBeUpdated] = useState({})
  const [productToBeDeleted, setProductToBeDeleted] = useState();
  const [createProductModal, setCreateProductModal] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({})
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5001/products').then((response) => {
      setProducts(response?.data)
    })
  }, [])


  /* EVENT HANDLERS STARTED*/
  const handleUpdate = (row) => {
    axios.get(`http://localhost:5001/products/${row?.id}`).then((response) => {
      setProductToBeUpdated(response?.data)
    })
    handleOpen("updateProduct")
  }
  const handleView = (row) => {
    handleOpen("viewProduct")
    axios.get(`http://localhost:5001/products/${row?.id}`).then((response) => {
      setOpenedProduct(response?.data)
    })
  }


  const openDeleteProductModal = (row) => {
    setProductToBeDeleted(row)
    setDeleteProductModal(true)

  }
  const closeDeleteProductModal = (confirmDelete) => {
    if (confirmDelete) {
      axios.delete(`http://localhost:5001/products/${productToBeDeleted?.id}`).then((response) => {
        setProducts(response?.data)
        toast.error("Product Deleted ");
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
    })


  }

  const previewImageHandler = (e) => {
    const file = e.target.files[0]
    if(file)
      {
        setPreviewUrl(URL.createObjectURL(file))
      }
  }
  /* EVENT HANDLERS ENDED*/




  let productColumns = (Object.keys(products?.[0] || {}))?.filter((col) => (col !== "img"))?.map((col) => col.toLocaleUpperCase())
  productColumns.splice(5, 1)

  const columns = productColumns?.map((column) => ({ name: column, selector: row => row?.[column?.toLocaleLowerCase()],sortable:true}))

  columns?.push(
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
          color="info"
          onClick={() => handleView(row)}
        >
          View
        </Button>
        <Button
          variant="outlined"
          color="error"
          // onClick={() => handleDelete(row)}
          onClick={() => openDeleteProductModal(row)}
        >
          Delete
        </Button>
      </div>
    })
  columns.splice(1, 0, {
    name: 'IMAGE',
    cell: row => <img
      height="40px"
      width="40px"
      alt={row.name}
      src={`${process.env.VITE_BACKEND_DOMAIN}${products?.find((p) => p?.id === row?.id)?.image}`}
    />

  })

  const data = products?.length > 0 && products?.map((product) => {
    const { image, ...newProduct } = product;
    return newProduct
  })

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

      const formData = new FormData()
      formData.append('title', values?.title)
      formData.append('price', values?.price)
      formData.append('description', values?.description)
      formData.append('category', values?.category)
      formData.append('image', values?.image)
      formData.append('stock', values?.stock)


      axios.post("http://localhost:5001/products", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        setProducts(res?.data?.product)
        toast.success('Product Created Successfully')
      })
      setCreateProductModal(false)
      resetForm()

    }
  })

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All Products</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleOpen("CreateProduct")}
        >
          Add Product
        </Button>
      </Stack>

      {/* <Card>
        <UserTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        />
        
        <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
            <UserTableHead
            order={order}
            orderBy={orderBy}
            rowCount={users.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
            headLabel={[
              { id: 'name', label: 'Name' },
              { id: 'company', label: 'Company' },
              { id: 'role', label: 'Role' },
              { id: 'isVerified', label: 'Verified', align: 'center' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
            />
            <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                    key={row.id}
                    name={row.name}
                    role={row.role}
                    status={row.status}
                    company={row.company}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}
                  
                  <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />
                  
                  {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </Scrollbar>
                  
                  <TablePagination
                  page={page}
                  component="div"
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Card> */}



      <DataTable
        columns={columns}
        data={data}
      />


      <div style={{ margin: "25%" }}>
        {/* VIEW PRODUCT */}
        <Modal
          open={viewProductModal}
          onClose={() => handleClose("viewProduct")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
              {openedProduct?.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: "150px" }}
                  image={`${process.env.VITE_BACKEND_DOMAIN}${openedProduct?.image}`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {openedProduct?.category}
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
          open={createProductModal}
          onClose={() => handleClose("CreateProduct")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={addProductStyle}>
            <div className=''>
              <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                Create Product
              </Typography>
              <br />


              <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="title" name="title" onChange={handleChange} value={values?.title} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" name="price" onChange={handleChange} value={values?.price} id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <textarea name="description" onChange={handleChange} value={values?.description} id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="category" name="category" onChange={handleChange} value={values?.category} id="category" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="file" name="image" onChange={(e) => { setFieldValue('image', e.target.files[0]) }} id="image" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="file" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" name="stock" value={values?.stock} onChange={handleChange} id="stock" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="stock" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock </label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
              </form>

            </div>

          </Box>
        </Modal>


        {/* UPDATE PRODUCT */}
        <Modal
          open={updateProductModal}
          onClose={() => handleClose("updateProduct")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={addProductStyle}>
            <div className=''>
              <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                Update Product
              </Typography>
              <br />


              <form className="max-w-md mx-auto" onSubmit={(e) => updateProduct(e)}>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="title" name="title" onChange={(e) => setProductToBeUpdated({ ...productToBeUpdated, title: e.target.value })} value={productToBeUpdated?.title} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" name="price" onChange={(e) => setProductToBeUpdated({ ...productToBeUpdated, price: e.target.value })} value={productToBeUpdated?.price} id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <textarea name="description" onChange={(e) => setProductToBeUpdated({ ...productToBeUpdated, description: e.target.value })} value={productToBeUpdated?.description} id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="category" name="category" onChange={(e) => setProductToBeUpdated({ ...productToBeUpdated, category: e.target.value })} value={productToBeUpdated?.category} id="category" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <div className='flex gap-4'>
                    <input type="file" name="image" onChange={(e) => { setProductToBeUpdated({ ...productToBeUpdated, image: e.target.files[0] }); previewImageHandler(e) }} id="image" className="block py-2.5 px-0 w-[50%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <img src={(typeof productToBeUpdated.image == 'object' ) ? previewUrl : `${process.env.VITE_BACKEND_DOMAIN}${productToBeUpdated?.image}`  } alt="" className='h-[50px] w-[50px]' />
                  </div>
                  <label htmlFor="file" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="number" name="stock" value={productToBeUpdated?.stock} onChange={(e) => setProductToBeUpdated({ ...productToBeUpdated, stock: e.target.value })} id="stock" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="stock" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock </label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </form>

            </div>

          </Box>
        </Modal>



        {/* DELETE PRODUCT */}
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
