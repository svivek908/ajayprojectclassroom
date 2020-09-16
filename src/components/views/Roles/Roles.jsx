import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { useForm } from "react-hook-form";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../../layout/dashboard/Listitems';
import UserProfile from '../../common/UserProfile';
import baseUrl from '../../../Config'
import axios from 'axios';
import MaterialTable from "material-table";
import { Modal} from '@material-ui/core';
import authHeader from '../../../AuthHeader'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Copyright from '../../common/Copyright'
 
 
 
 
import './roles.css';
import Logo from '../../common/Logo';
const tableIcons = {

  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  DeleteOutline: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),

};

const columns = [
  { title: "id", field: "id" },
  { title: "Title", field: "title" },
  { title: "Status", field: "status" },
  { title: "CreatedBy", field: "createdBy" }
]

// base Url define here...
const api = axios.create({
  baseURL: `http://192.168.0.248/driving/`
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

export default function Roles() {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  // const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [openRolesModal, setRolesModal] = React.useState(false);
  const [openRolesEditModal, setRolesEditModal] = React.useState(false);
  const initialFormState = { id: null, title: '', status: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const [artistaSeleccionado, setartistaSeleccionado] = useState({
      title: "",
      status: "",
      id: "",
      createdBy: ""

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
  //     alert('hello');
     
  // }

  //Get All Roles Api Calling
  useEffect(() => {
      api.get("/roles", {
          headers: authHeader()
      })
          .then(res => {
              setData(res.data.roles)
          })
          .catch(error => {
              console.log("Error")
          })
  }, [])


  //Get AgainRoles api call for quick Updates
  const getAgainRoles = () => {
      fetch(`${baseUrl.apiUrl}roles`, {
          method: 'get',
          headers: authHeader()

      })
          .then(response => response.json())
          .then(data => setData(data.roles));
  }


  //Create Role api Call here...

  const onSubmit = data => {
      
      handleClose();
      const addRolesData = { title: data.title, status: data.status === true ? 'Active' : 'InActive', createdBy: localStorage.getItem('id') }

      fetch(`${baseUrl.apiUrl}roles`, {
          method: 'post',
          headers: authHeader(),
          body: JSON.stringify(addRolesData)

      }).then((result) => {
          getAgainRoles();

      });
  };


  //Get CurrentRow for Update Roles
  const receiveRowForUpdateRoles = (dataForUpdate) => {
      handleClickRolesModalOpenforEdit();
      setCurrentUser({ id: dataForUpdate.id, title: dataForUpdate.title, status: dataForUpdate.status, createdBy: localStorage.getItem('id') })

  }
   // Onchange function for update the field of roles
  const onChangeRoles = (e) => {
      e.persist();
      if (e.target.type === 'checkbox' && e.target.checked) {
          setCurrentUser({ ...currentUser, [e.target.name]: '' });
      } else {
          setCurrentUser({ ...currentUser, [e.target.name]: e.target.status });
      }
      setCurrentUser({ ...currentUser, [e.target.name]: e.target.status });

  }

  //Submit formData for Update Roles
  const onSubmitforEditRoles = (data) => {
      const editRolesData = { title: data.title, status: data.status===true ? 'Active' : 'InActive', createdBy: localStorage.getItem('id') }
      handleCloseforEditModal();
          fetch(`${baseUrl.apiUrl}roles/`+currentUser.id, {
          method: 'put',
          headers: authHeader(),
          body: JSON.stringify(editRolesData)

          }).then((result) => {
          getAgainRoles();

          });

  }

  // const peticionPost = async () => {
  //     alert('yes i am ready')
     
  // }

 //Delete Role api call here...

  const deleteRole = async () => {

      fetch(`${baseUrl.apiUrl}roles/` + artistaSeleccionado.id, {
          method: 'delete',
          headers: authHeader()
      }).then((result) => {
          abrirCerrarModalEliminar();
          getAgainRoles();

      });
  }

  const seleccionarArtista = (artista, caso) => {
      setartistaSeleccionado(artista);
      (caso === "Editar") ? abrirCerrarModalEditar()
          :
          abrirCerrarModalEliminar()
  }

  // const addNewRoles = () => {
  //     setModalInsertar(!modalInsertar);
  // }


  const abrirCerrarModalEditar = () => {
      setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
      setModalEliminar(!modalEliminar);
  }



  // const bodyInsertar = (
  //     <div className={classes.modal}>
  //         <h3>New Role</h3>
  //         <TextField className={classes.inputMaterial} label="Title" name="title" onChange={handleChange} />
  //         <br />
  //         <TextField className={classes.inputMaterial} label="Status" name="status" onChange={handleChange} />

  //         <br /><br />
  //         <div align="right">
  //             <Button color="primary" onClick={() => peticionPost()}>Submit</Button>
  //             <Button onClick={() => addNewRoles()}>Cancel</Button>
  //         </div>
  //     </div>
  // )


  const bodyEliminar = (
      <div className={classes.modal}>
          <p>Are you ready for Delete<b>{artistaSeleccionado && artistaSeleccionado.artista}</b>? </p>
          <div align="right">
              <Button color="secondary" onClick={() => deleteRole()}>yes</Button>
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
          <div style={{ marginRight: '10px' }}>
            <UserProfile />
          </div>
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
       <Logo/>
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
              <h1>Roles</h1>
              <div className="App">
            <br />
            <Button onClick={() => handleClickRolesModalOpen()} variant="contained" color="primary">Add New Roles</Button>

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

                        onClick: (event, rowData) => receiveRowForUpdateRoles(rowData, "Editar")
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

        
            <Dialog open={openRolesModal} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth = {'md'}> 
                <DialogTitle id="form-dialog-title">Add Roles</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', minWidth: '400px' }} >
                        <label>Title</label>
                        <input name="title" id="addinput" variant="outlined"
                            ref={register({ required: true, maxLength: 10 })} style={{
                                display: 'block', boxSizing: 'borderBox',
                                width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                                fontSize: '14px'
                            }} />
                        {errors.title && <p>This field is required</p>}

                        <div style={{ display: 'flex' }}>
                            <label id="addLable">Status</label>
                            <input
                                type="checkbox"
                                name="status"
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
 
            <Dialog open={openRolesEditModal} onClose={handleCloseforEditModal} aria-labelledby="form-dialog-title" maxWidth = {'md'}>
                <DialogTitle id="form-dialog-title">Edit Roles</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit(onSubmitforEditRoles)}  style={{ marginBottom: '20px', minWidth: '400px' }} >
                        <label>Title</label>
                        <input name="title" id="addinput" variant="outlined" onChange={onChangeRoles} value={currentUser.title}
                            ref={register()} style={{
                                display: 'block', boxSizing: 'borderBox',
                                width: '100%', borderRadius: '4px', border: '1px solid black', padding: '10px 15px', marginBottom: '10px',
                                fontSize: '14px'
                            }} />
                        {errors.title && <p>This field is required</p>}

                        <div style={{ display: 'flex' }}>
                            <label id="addLable">Status</label>
                            <input
                                type="checkbox"
                                name="status"
                                style={{ marginTop: '3px', marginLeft: '10px' }}
                                onChange={onChangeRoles}
                              
                                ref={register()}
                                checked={currentUser.status === 'Active' ? true : null}
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
          <Box pt={10}>
            <Copyright />
          </Box>
        </Container>
      </main>
       
    </div>
  );
}