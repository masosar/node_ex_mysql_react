import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Edit, Delete } from "@material-ui/icons";
import { createStyles, withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';

//CSS styles
const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    // minWidth: 700,
    margin: "auto auto",
  },
  box: {
    margin: "auto auto",
    backgroundColor: "#ccc",
    paddingTop: "64px",
    maxWidth: "1000px",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

//const baseUrl = "https://node-ex-mysql.herokuapp.com/";
const baseUrl = "http://localhost:3060/posts";

const Test = () => {
  const classes = useStyles();
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    },
  }))(TableRow);

  //Feeds with useEffect and is used by map
  const [data, setData] = useState([]);
  //Holds data for new post 
  const [post, setPost] = useState({
    category_id: "",
    title: "",
    body: "",
    author: "",
    created_at: "",
  });
  const [postToAdd, setPostToAdd] = useState({
    category_id: "",
    title: "",
    body: "",
    author: "",
    created_at: "",
  });
  // const [selectedPost, setSelectedPost] = useState({
  //   category_id: "",
  //   title: "",
  //   body: "",
  //   author: "",
  //   created_at: "",
  // });
  const [modalInsert, setModalInsert] = useState(false);

  const getPosts = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => setData(res));
      console.log('From getposts');
  };

  useEffect(() => {

    getPosts();

  }, []);

  const petitionPost = () => {
    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postToAdd)
    }

    fetch(baseUrl, requestInit)
    .then((res) => res.text())
    .then((res) => console.log(res));

    toggleModalInsert();
    getPosts();
    console.log('PetitionPost executed');
  }

  //Feeds the body for the post request
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostToAdd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // const petitionPost = async () => {
  //   await axios.post(baseUrl+'add/', selectedMovie).then((response) => {
  //     setData(data.concat(response.data));
  //     toggleModalInsert();
  //   });
  // };


  const toggleModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  // const validateInsert = () => {
  //   let temp = {};
  //   temp.category_id = values.category_id?"":"Required field."
  //   temp.title = values.title?"":"Required field."
  // }

  //ModalInsert ------------------------------------
  const modalBodyInsert = (
    <div className={classes.modal}>
      <h3>Add post</h3>
      <TextField
        name="category_id"
        className={classes.inputMaterial}
        label="Category ID"
        onChange={handleChange}
      />
      <br />
      <TextField 
        name="title" 
        className={classes.inputMaterial} 
        label="Title" 
        onChange={handleChange}
      />
      <br />
      <TextField
        name="body"
        className={classes.inputMaterial}
        label="Description"
        multiline
        rows={6}
        onChange={handleChange}
      />
      <br />
      <TextField
        name="author"
        className={classes.inputMaterial}
        label="Author"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="created_at"
        className={classes.inputMaterial}
        label="Release date"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => petitionPost()}>Insert</Button>
        <Button onClick={() => toggleModalInsert()}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DehazeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Posts
          </Typography>
          <Button onClick={() => toggleModalInsert()}  color="inherit">Add post</Button>
        </Toolbar>
      </AppBar>
      <Box component="div" className={classes.box}>
        {/* <br />
        <Button>Add post</Button> */}
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            {/* <div className={classes.root} align="center">
          <CircularProgress />
        </div> */}
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Author</StyledTableCell>
                <StyledTableCell>Release date</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell style={{ width: "2%" }}>
                    {data.category_id}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "10%" }}>
                    {data.title}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "55%" }}>
                    {data.body}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "13%" }}>
                    {data.author}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "10%" }}>
                    {data.created_at}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "10%" }}>
                    <Edit
                      className={classes.icons}
                      //onClick={() => selectMovie(post, "Edit")}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Delete
                      className={classes.icons}
                      //onClick={() => selectMovie(post, "Delete")}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ModalInsertar */}
        <Modal open={modalInsert} onClose={() => toggleModalInsert()}>
          {modalBodyInsert}
        </Modal>
      </Box>
    </div>
  );
};

export default Test;
