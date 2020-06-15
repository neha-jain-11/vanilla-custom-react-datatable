import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp, faLongArrowAltDown, faStar } from '@fortawesome/free-solid-svg-icons'

function TableBody(props) {

  const [data, updateData] = useState(props.data);

  const updateSort = (event) => {
    const index = event.target['dataset'].index;
    const order = props.sort.index === index ? toggleOrder(props.sort.order) : 'ASC';
    props.updateSort({ index, order });
  }

  const toggleOrder = (order) => {
    if (order === 'ASC') return 'DSC';
    if (order === 'DSC') return 'ASC';
  }

  useEffect(() => {
    updateData(props.data);
  }, [props.data]);

  return (
    <div className="col-12 table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            {props.columns.map((col, index) => (
              <th
                id={`th-${col.name}`}
                scope="col"
                key={index}
                data-index={index}
                onClick={updateSort}
              >
                {col.name}
                {props.sort.index == index && props.sort.order === 'ASC' && <FontAwesomeIcon icon={faLongArrowAltUp} color="blue" className="ml-2" />}
                {props.sort.index == index && props.sort.order === 'DSC' && <FontAwesomeIcon icon={faLongArrowAltDown} color="blue" className="ml-2" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data.length ? data.map((list, index) => {
              return <tr key={index}>
                {list.map((listValue, dataIndex) => {
                  const column = props.columns[dataIndex];
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
                    return <td key={dataIndex}><span className="font-weight-bold">{props.columns[dataIndex].value}</span>{listValue}</td>
                  }
                  return <td key={dataIndex}>{listValue}</td>
                })}
              </tr>
            }) :
              <tr><td className="text-center" colSpan={props.columns.length}>Sorry , No records found!</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default TableBody;
