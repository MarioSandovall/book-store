import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import SaveIcon from "@material-ui/icons/Save";

import "./styles/EditBook.css";
import BookService from "../../pages/Book/BookService";

export default class AddBook extends React.Component {
  handleSave = () => {
    const book = this.props.book;
    BookService.add(book).then(
      (response) => {
        this.props.onSaved();
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render () {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
        <DialogContent>
          <TextField
            className="text-field"
            type="text"
            id="title"
            name="title"
            label="Title"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.title}
          />
          <TextField
            className="text-field"
            type="text"
            id="description"
            name="description"
            label="Description"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.description}
          />
          <TextField
            className="text-field"
            type="text"
            id="genre"
            name="genre"
            label="Genre"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.genre}
          />
          <TextField
            className="text-field"
            type="text"
            id="author"
            name="author"
            label="Author"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.author}
          />
          <TextField
            className="text-field"
            type="number"
            id="price"
            name="price"
            label="Price"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.Price}
          />
          <TextField
            className="text-field"
            type="number"
            id="stock"
            name="stock"
            label="Stock"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.stock}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button
            onClick={this.handleSave}
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
