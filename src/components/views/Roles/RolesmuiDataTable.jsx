import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import authHeader from '../../../AuthHeader'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "react-hook-form";
 

import baseUrl from '../../../Config'



// columns define here...

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
    baseURL: `http://192.168.0.248/driving/api/`
})


// all style's of component define here
const useStyles = makeStyles((theme) => ({
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

function RolesmuiDataTable() {
    
    const styles = useStyles();
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
    //     <div className={styles.modal}>
    //         <h3>New Role</h3>
    //         <TextField className={styles.inputMaterial} label="Title" name="title" onChange={handleChange} />
    //         <br />
    //         <TextField className={styles.inputMaterial} label="Status" name="status" onChange={handleChange} />

    //         <br /><br />
    //         <div align="right">
    //             <Button color="primary" onClick={() => peticionPost()}>Submit</Button>
    //             <Button onClick={() => addNewRoles()}>Cancel</Button>
    //         </div>
    //     </div>
    // )

  
 
    const bodyEliminar = (
        <div className={styles.modal}>
            <p>Are you ready for Delete<b>{artistaSeleccionado && artistaSeleccionado.artista}</b>? </p>
            <div align="right">
                <Button color="secondary" onClick={() => deleteRole()}>yes</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )

    return (
        <div className="App">
            <br />
            <Button onClick={() => handleClickRolesModalOpen()}>Add New Roles</Button>

            <br /><br />
            <MaterialTable
                columns={columns}
                data={data}
                icon={tableIcons}
                title="Roles"
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
    );
}

export default RolesmuiDataTable;
