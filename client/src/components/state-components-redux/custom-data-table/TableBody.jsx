import React, { Component } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp, faLongArrowAltDown, faStar } from '@fortawesome/free-solid-svg-icons'

export class TableBody extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-12 table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {this.props.columns.map((col, index) => (
                <th
                  id={`th-${col.name}`}
                  scope="col"
                  key={index}
                  data-index={index}
                  onClick={this.props.updateSort}
                >
                  {col.name}
                  {this.props.sort.index == index && this.props.sort.order === 'ASC' && <FontAwesomeIcon icon={faLongArrowAltUp} color="blue" className="ml-2" />}
                  {this.props.sort.index == index && this.props.sort.order === 'DSC' && <FontAwesomeIcon icon={faLongArrowAltDown} color="blue" className="ml-2" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              this.props.data.length ? this.props.data.map((list, index) => {
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

const mapStateToProps = (state) => {
  return {
    data: state.data.records
  };
};

export default connect(mapStateToProps, null)(TableBody);
