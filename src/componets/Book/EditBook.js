import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import SaveIcon from "@material-ui/icons/Save";

import BookService from "../../pages/Book/BookService";

export default class EditBook extends React.Component {
  handleSave = () => {
    const book = this.props.book;
    BookService.update(book.id, book).then(
      (response) => {
        this.props.onSaved();
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle id="form-dialog-title">Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={this.props.onChange}
            value={this.props.book.name}
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