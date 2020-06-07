import React, { Component } from "react";
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.hasFocus = this.hasFocus.bind(this);

    this.state = {
      show: false
    };
  }

  componentDidMount() {
    // handles mouse events like click and dblclick
    document.addEventListener('mouseup', this.handleMouseEvent);
    // handles tabbing out of
    this.dropdown.addEventListener('focusout', this.handleBlurEvent);
  }

  hasFocus(target) {
    // React ref callbacks pass `null` when a component unmounts, so guard against `this.dropdown` not existing
    if (!this.dropdown) {
      return false;
    }
    var dropdownHasFocus = false;
    var nodeIterator = document.createNodeIterator(this.dropdown, NodeFilter.SHOW_ELEMENT, null, false);
    var node;

    while (node = nodeIterator.nextNode()) {
      if (node === target) {
        dropdownHasFocus = true;
        break;
      }
    }

    return dropdownHasFocus;
  }

  handleBlurEvent(e) {
    var dropdownHasFocus = this.hasFocus(e.relatedTarget);

    if (!dropdownHasFocus) {
      this.setState({
        show: false
      });
    }
  }

  handleMouseEvent(e) {
    var dropdownHasFocus = this.hasFocus(e.target);

    if (!dropdownHasFocus) {
      this.setState({
        show: false
      });
    }
  }

  toggleDropdown() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className={`dropdown ${this.state.show ? 'show' : ''}`} ref={(dropdown) => this.dropdown = dropdown}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.show}
          onClick={this.toggleDropdown}>
          Manage Filter
        </button>
        <div
          className={`dropdown-menu ${this.state.show ? 'show' : ''}`}
          aria-labelledby="dropdownMenuButton">
          <div className="row p-4">
            <div className="col-12">
              <div className="row">
                <div className="col-4 form-group">
                  <label htmlFor="Name" className="mb-0 text-secondary">Name</label>
                  <input type="text" className="form-control p-0" name="Name" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Gender" className="mb-0 text-secondary">Gender</label>
                  <input type="text" className="form-control p-0" name="Gender" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Age" className="mb-0 text-secondary">Age</label>
                  <input type="text" className="form-control p-0" name="Age" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Title" className="mb-0 text-secondary">Title</label>
                  <input type="text" className="form-control p-0" name="Title" />
                </div>

                <div className="col-4 form-group">
                  <label htmlFor="Location" className="mb-0 text-secondary">Location</label>
                  <input type="text" className="form-control p-0" name="Location" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Salary" className="mb-0 text-secondary">Salary</label>
                  <input type="text" className="form-control p-0" name="Salary" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Rating" className="mb-0 text-secondary">Rating</label>
                  <input type="text" className="form-control p-0" name="Rating" />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="Progress" className="mb-0 text-secondary">Progress</label>
                  <input type="text" className="form-control p-0" name="Progress" />
                </div>
              </div>
            </div>
            <div className="col-12 text-right mt-2">
              <button className="btn btn-primary">Submit</button>
              <button className="btn btn-secondary ml-2">Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;