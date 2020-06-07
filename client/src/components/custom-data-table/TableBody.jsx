import React, { Component } from "react";
const fetch = require("node-fetch");
import { sortByOrder } from '../../utils/util';

class TableBody extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.updateSort = this.updateSort.bind(this);
  }

  componentWillMount() {
    console.log('hey, i am componentWillMount >> props data', this.props.data);
    console.log('hey, i am componentWillMount >> state data', this.state.data);
    this.applySort(this.props.data, this.props.sort);
  }

  componentWillReceiveProps({ data, sort }) {
    console.log('hey, i am componentWillReceiveProps >> props data', data);
    console.log('hey, i am componentWillReceiveProps >> state data', this.state.data);
    console.log('hey, i am componentWillReceiveProps >> sort props', sort);
    this.applySort(data, sort);
  }

  updateSort(event) {
    const index = event.target['dataset'].index;
    const order = this.props.sort.index === index ? this.toggleOrder(this.props.sort.order) : 'ASC';
    this.props.updateSort({ index, order });
  }

  toggleOrder(order) {
    if (order === 'ASC') return 'DSC';
    if (order === 'DSC') return 'ASC';
  }

  applySort(data, sort) {
    console.log("applied sort", sort);
    if (sort.index) {
      const sortedData = sortByOrder([...data], sort.index, sort.order);
      this.setState({ data: sortedData }, () => {
        console.log("applied sort", this.state.data);
      });
    } else {
      this.setState({ data }, () => {
        console.log("applied sort", this.state.data);
      });
    }

  }

  render() {
    return (
      <div className="col-12 text-center p-0">
        <div className="col-8 col-offset-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                {this.props.columns.map((val, index) => (
                  <th
                    scope="col"
                    key={index}
                    data-index={index}
                    onClick={this.updateSort}
                  >
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((list, index) => (
                  <tr key={index}>
                    {list.map((listValue, index) => (
                      <td key={index}>{listValue}</td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default TableBody;
