import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import BookService from "../../pages/Book/BookService";

export default class RemoveBook extends React.Component {
  handleSave = () => {
    const id = this.props.bookId;
    BookService.deleteById(id).then(
      (response) => {
        this.props.onSaved();
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle id="form-dialog-title">Remove Book</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to remove this book ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.handleSave} color="secondary">
            continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
