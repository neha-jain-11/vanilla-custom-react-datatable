import React, { Component } from "react";
const fetch = require("node-fetch");
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp, faLongArrowAltDown, faStar } from '@fortawesome/free-solid-svg-icons'

class TableBody extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.updateSort = this.updateSort.bind(this);
  }

  componentWillMount() {
    this.setState({ data: this.props.data });
  }

  componentWillReceiveProps({ data, sort }) {
    this.setState({ data, sort });
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

  render() {
    return (
      <div className="col-12 table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {this.props.columns.map((col, index) => (
                <th
                  scope="col"
                  key={index}
                  data-index={index}
                  onClick={this.updateSort}
                >
                  {col.name}
                  {this.props.sort.index == index && this.props.sort.order === 'ASC' && <FontAwesomeIcon icon={faLongArrowAltUp} color="blue" className="ml-2"/>}
                  {this.props.sort.index == index && this.props.sort.order === 'DSC' && <FontAwesomeIcon icon={faLongArrowAltDown} color="blue" className="ml-2"/>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.length ? this.state.data.map((list, index) => {
                return <tr key={index}>
                  {list.map((listValue, dataIndex) => {
                    const column = this.props.columns[dataIndex];
                    if (column.type === "progress") {
                      return <td key={dataIndex}>
                        <div className="progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${listValue}%` }} aria-valuenow={listValue} aria-valuemin="0" aria-valuemax="100">

                          </div>
                          <div className="progress-bar-title">{listValue}%</div>
                        </div>
                      </td>
                    } else if (column.type === "icon") {
                      return <td key={dataIndex}>
                        {
                          Array.from(Array(listValue), (e, i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} color="brown" />
                          })
                        }

                      </td>
                    }
                    else if (column.type === "currency") {
                      return <td key={dataIndex}><span className="font-weight-bold">{this.props.columns[dataIndex].value}</span>{listValue}</td>
                    }
                    return <td key={dataIndex}>{listValue}</td>
                  })}
                </tr>
              }) :
                <tr><td className="text-center" colSpan={this.props.columns.length}>Sorry , No records found!</td></tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}


export default TableBody;
