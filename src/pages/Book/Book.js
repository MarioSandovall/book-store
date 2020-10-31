import React, { Component } from "react";

import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import bookService from "./BookService";
import BookAdd from "../../componets/Book/AddBook";
import EditBook from "../../componets/Book/EditBook";
import RemoveBook from "../../componets/Book/RemoveBook";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookToAdd: {
        title: "",
        description: "",
        genre: "",
        author: "",
        price: "",
        stock: "",
      },
      bookToEdit: {
        id: 0,
        title: "",
        description: "",
        genre: "",
        author: "",
        price: "",
        stock: "",
      },
      bookIdToRemove: 0,
      isAddBookModalOpen: false,
      isEditBookModalOpen: false,
      isRemoveBookModalOpen: false,
    };
  }
  columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "stock", headerName: "stock", width: 200 },
    {
      field: "edit",
      headerName: " ",
      sortable: false,
      renderCell: (params) => {
        const onEdit = () => {
          this.setState({
            ...this.state,
            bookToEdit: params.data,
            isEditBookModalOpen: true,
          });
        };
        return (
          <IconButton aria-label="edit" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: "remove",
      headerName: " ",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onRemove = () => {
          this.setState({
            ...this.state,
            bookIdToRemove: params.data.id,
            isRemoveBookModalOpen: true,
          });
        };
        return (
          <IconButton aria-label="remove" onClick={onRemove}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];
  componentDidMount() {
    this.handleGetBooks();
  }
  handleGetBooks = () => {
    bookService.getAll().then(
      (response) => {
        this.setState({
          ...this.state,
          books: response.data.books,
          isAddBookModalOpen: false,
          isEditBookModalOpen: false,
          isRemoveBookModalOpen: false,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  handleOpenBookAddModal = () => {
    this.setState({
      ...this.state,
      isAddBookModalOpen: true,
    });
  };
  handleCloseBookModal = () => {
    this.setState({
      ...this.state,
      isAddBookModalOpen: false,
      isEditBookModalOpen: false,
      isRemoveBookModalOpen: false,
    });
  };
  handleChangeBookToEdit = (e) => {
    this.setState({
      ...this.state,
      bookToEdit: {
        ...this.state.bookToEdit,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChangeBookToAdd = (e) => {
    this.setState({
      ...this.state,
      bookToAdd: {
        ...this.state.bookToAdd,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <>
        <Box my={2}>
          <Typography variant="h4">Books</Typography>
        </Box>
        <Box my={2}>
          <Button
            m={3}
            variant="outlined"
            onClick={this.handleOpenBookAddModal}
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Book
          </Button>
        </Box>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={this.state.books}
            columns={this.columns}
            pageSize={5}
          />
        </div>
        <BookAdd
          book={this.state.bookToAdd}
          open={this.state.isAddBookModalOpen}
          onSaved={this.handleGetBooks}
          onClose={this.handleCloseBookModal}
          onChange={this.handleChangeBookToAdd}
        ></BookAdd>
        <EditBook
          book={this.state.bookToEdit}
          open={this.state.isEditBookModalOpen}
          onSaved={this.handleGetBooks}
          onClose={this.handleCloseBookModal}
          onChange={this.handleChangeBookToEdit}
        ></EditBook>
        <RemoveBook
          open={this.state.isRemoveBookModalOpen}
          bookId={this.state.bookIdToRemove}
          onSaved={this.handleGetBooks}
          onClose={this.handleCloseBookModal}
        ></RemoveBook>
      </>
    );
  }
}
