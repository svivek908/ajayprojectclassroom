import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaterialTable from "material-table";
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Modal } from '@material-ui/core';
import { mainListItems, secondaryListItems } from '../../layout/dashboard/Listitems';
import UserProfile from '../../common/UserProfile';
import authHeader from '../../../AuthHeader';
import Paper from '@material-ui/core/Paper';
import Logo from '../../common/Logo';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { useForm } from "react-hook-form";
import Copyright from '../../common/Copyright';
import axios from 'axios';
import baseUrl from '../../../Config'

const Url=baseUrl.apiUrl

const tableIcons = {

  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  DeleteOutline: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),

};

const columns = [
  { title: "id", field: "id" },
  { title: "Branch", field: "branchId" },
  { title: "Schedule Date", field: "scheduleDate" },
  { title: "Start DateTime", field: "startDateTime" },
  { title: "End DateTime", field: "endDateTime" },
  { title: "Advance Amount", field: "advanceAmount" },
  { title: "Total Amount", field: "totalAmount" }
]

// base Url define here...
const api = axios.create({
  baseURL: Url 
})

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));


export default function ClassesTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  // const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [openRolesModal, setRolesModal] = React.useState(false);
  const [openRolesEditModal, setRolesEditModal] = React.useState(false);
  const initialFormState = { id: null, title: '', status: '', address: '', headoffice: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [artistaSeleccionado, setartistaSeleccionado] = useState({
    id: "",
    title: "",
    branchId:"",
    scheduleDate: "",
    startDateTime:"",
    endDateTime:"",
    advanceAmount:"",
    totalAmount:""

  })
  const handleClickRolesModalOpen = () => {
    setRolesModal(true);
  };

  const handleClose = () => {
    setRolesModal(false);
  };

  const handleClickRolesModalOpenforEdit = () => {
    setRolesEditModal(true);
  };

  const handleCloseforEditModal = () => {
    setRolesEditModal(false);
  };



  // const handleChange = e => {
  //   alert('hello');

  // }

  //Get All Roles Api Calling
  useEffect(() => {
    api.get("/classes", {
      headers: authHeader()
    })
      .then(res => {
        setData(res.data.classes)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])


  //Get AgainRoles api call for quick Updates
  const getAgainBranch = () => {
    fetch(`${baseUrl.apiUrl}branches`, {
      method: 'get',
      headers: authHeader()

    })
      .then(response => response.json())
      .then(data => setData(data.branches));
  }


  //Create Role api Call here...

  const onSubmit = data => {

    console.log(data)
    handleClose();
    const addBranchData = { title: data.title, isActive: data.status === true ? 1 : 0, isHeadOffice: data.headoffice === true ? 1 : 0, address: data.address, createdBy: localStorage.getItem('id') }

    fetch(`${baseUrl.apiUrl}branches`, {
      method: 'post',
      headers: authHeader(),
      body: JSON.stringify(addBranchData)

    }).then((result) => {
      getAgainBranch();

    });
  };


  //Get CurrentRow for Update Roles
  const receiveRowForUpdateBranch = (dataForUpdate) => {

    handleClickRolesModalOpenforEdit();
    setCurrentUser({ id: dataForUpdate.id, title: dataForUpdate.title, status: dataForUpdate.isActive, address: dataForUpdate.address, headoffice: dataForUpdate.isHeadOffice, createdBy: localStorage.getItem('id') })

  }
  // Onchange function for update the field of roles
  const onChangeRoles = (e) => {
    e.persist();
    if (e.target.type === 'checkbox' && e.target.checked) {
      setCurrentUser({ ...currentUser, [e.target.name]: '' });
    }
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.status });
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.headoffice });

  }

  //Submit formData for Update Roles
  const onSubmitforEditBranch = (data) => {

    const editbranches = { title: data.title, isActive: data.status === true ? 1 : 0, isHeadOffice: data.headoffice === true ? 1 : 0, address: data.address, createdBy: localStorage.getItem('id') }
    handleCloseforEditModal();
    fetch(`${baseUrl.apiUrl}branches/` + currentUser.id, {
      method: 'put',
      headers: authHeader(),
      body: JSON.stringify(editbranches)

    }).then((result) => {
      getAgainBranch();

    });

  }

  // const peticionPost = async () => {
  //   alert('yes i am ready')

  // }

  //Delete Role api call here...

  const deleteBranch = async () => {

    fetch(`${baseUrl.apiUrl}branches/` + artistaSeleccionado.id, {
      method: 'delete',
      headers: authHeader()
    }).then((result) => {
      abrirCerrarModalEliminar();
      getAgainBranch();

    });
  }

  const seleccionarArtista = (artista, caso) => {
    setartistaSeleccionado(artista);
    (caso === "Editar") ? abrirCerrarModalEditar()
      :
      abrirCerrarModalEliminar()
  }

  // const addNewRoles = () => {
  //   setModalInsertar(!modalInsertar);
  // }


  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }


  // const bodyInsertar = (
  //   <div className={useStyles.modal}>
  //     <h3>New Branch</h3>
  //     <TextField className={useStyles.inputMaterial} label="Title" name="title" onChange={handleChange} />
  //     <br />
  //     <TextField className={useStyles.inputMaterial} label="Status" name="status" onChange={handleChange} />

  //     <br /><br />
  //     <div align="right">
  //       <Button color="primary" onClick={() => peticionPost()}>Submit</Button>
  //       <Button onClick={() => addNewRoles()}>Cancel</Button>
  //     </div>
  //   </div>
  // )

  const bodyEliminar = (
    <div className={classes.modal}>
      <p>Are you ready for Delete<b>{artistaSeleccionado && artistaSeleccionado.artista}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteBranch()}>yes</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )





  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);




  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {localStorage.getItem('useremail')}
          <UserProfile style={{ backgroundColor: '#fff' }} />

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >

        <div className={classes.toolbarIcon}>
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>

                <div className="container-fluid">
                  <h1>Classes</h1>
                  <div className="App">
                    <br />
                    <Button onClick={() => handleClickRolesModalOpen()} variant="contained" color="primary">Add New Classes</Button>

                    <br /><br />
                    <MaterialTable
                      columns={columns}
                      data={data}
                      icon={tableIcons}
                      title=""
                      actions={[
                        {

                          icon: () => <Edit />,
                          tooltip: 'Edit',

                          onClick: (event, rowData) => receiveRowForUpdateBranch(rowData, "Editar")
                        },
                        {

                          icon: () => <DeleteOutline />,
                          tooltip: 'Delete',

                          onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
                        },

                      ]}

                      options={{
                        actionsColumnIndex: -1,
                      }}

                      localization={{
                        header: {
                          actions: "Action"
                        }
                      }}
                    />


                    <Dialog open={openRolesModal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
                      <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>Add New Class</DialogTitle>
                      <DialogContent>

                        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', minWidth: '400px' }} >
                          <label>Title</label>
                          <input name="title" variant="outlined"
                            ref={register({ required: true, maxLength: 10 })} style={{
                              display: 'block', boxSizing: 'borderBox',
                              width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                              fontSize: '14px'
                            }} />
                          {errors.title && <p>This field is required</p>}
                          <label>Address</label>
                          <input name="address" variant="outlined" onChange={onChangeRoles}
                            ref={register()} style={{
                              display: 'block', boxSizing: 'borderBox',
                              width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                              fontSize: '14px'
                            }} />
                          {errors.address && <p>This field is required</p>}

                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <label id="addLable">Status</label>
                            <input
                              type="checkbox"
                              name="status"
                              style={{ marginTop: '3px', marginLeft: '10px' }}

                              defaultChecked={true}
                              ref={register()}

                            />
                            <label id="addLable">Head Office</label>
                            <input
                              type="checkbox"
                              name="headoffice"
                              style={{ marginTop: '3px', marginLeft: '10px' }}

                              defaultChecked={true}
                              ref={register()}

                            />


                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              id="addButton"
                              style={{ marginRight: '5px' }}
                            >
                              Submit </Button>

                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="secondary"
                              onClick={handleClose}
                            >
                              Cancel
                </Button>

                          </div>
                        </form>

                      </DialogContent>

                    </Dialog>

                    <Dialog open={openRolesEditModal} onClose={handleCloseforEditModal} aria-labelledby="form-dialog-title" maxWidth={'md'}>
                      <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>Edit Class</DialogTitle>
                      <DialogContent>

                        <form onSubmit={handleSubmit(onSubmitforEditBranch)} style={{ marginBottom: '20px', minWidth: '400px' }} >
                          <label>Title</label>
                          <input name="title" variant="outlined" onChange={onChangeRoles} value={currentUser.title}
                            ref={register()} style={{
                              display: 'block', boxSizing: 'borderBox',
                              width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                              fontSize: '14px'
                            }} />
                          {errors.title && <p>This field is required</p>}

                          <label>Address</label>
                          <input name="address" variant="outlined" onChange={onChangeRoles} value={currentUser.address}
                            ref={register()} style={{
                              display: 'block', boxSizing: 'borderBox',
                              width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                              fontSize: '14px'
                            }} />
                          {errors.address && <p>This field is required</p>}
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <label id="addLable">Status</label>
                            <input
                              type="checkbox"
                              name="status"
                              style={{ marginTop: '3px', marginLeft: '10px' }}
                              onChange={onChangeRoles}

                              ref={register()}
                              checked={currentUser.status === 1 ? true : null}
                            />

                            <label id="addLable">Head Office</label>
                            <input
                              type="checkbox"
                              name="headoffice"
                              style={{ marginTop: '3px', marginLeft: '10px' }}
                              onChange={onChangeRoles}
                              ref={register()}
                              checked={currentUser.headoffice === 1 ? true : null}

                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              id="addButton"
                              style={{ marginRight: '5px' }}
                            >
                              Submit </Button>

                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="secondary"
                              onClick={handleCloseforEditModal}
                            >
                              Cancel
                             </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>


                    <Modal
                      open={modalEliminar}
                      onClose={abrirCerrarModalEliminar}>
                      {bodyEliminar}
                    </Modal>
                  </div>
                
                
                </div>
              </Paper>
            </Grid>

          </Grid>
          <Box pt={20}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}