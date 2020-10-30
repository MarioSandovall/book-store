import React, { Component } from "react";

import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
        name: "",
      },
      bookToEdit: {
        id: 0,
        name: "",
      },
      bookIdToRemove: 0,
      isAddBookModalOpen: false,
      isEditBookModalOpen: false,
      isRemoveBookModalOpen: false,
    };
  }
  columns = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onEdit}
          >
            Edit
          </Button>
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
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={onRemove}
          >
            Remove
          </Button>
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
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <>
        <Typography variant="h4">Books</Typography>
        <Button
          variant="outlined"
          onClick={this.handleOpenBookAddModal}
          color="primary"
        >
          Add Book
        </Button>
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
