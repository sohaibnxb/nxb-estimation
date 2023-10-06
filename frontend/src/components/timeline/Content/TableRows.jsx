import React from "react";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  textFieldClasses,
} from "@mui/material";

import closeIcon from "../../../assets/images/close.svg"
import addIcon from "../../../assets/images/add.svg"
const TableRows = ({
  rowsData,
  rowsExtraData,
  deleteTableRows,
  handleChange,
  addSubRows,
  showExtraRow,
  handleExtraChange,
  deleteTableExtraRows,
  addTableRows
}) => {
  return rowsData?.map((data, index) => {
    const { itemName, hours, subItems } = data;
    return (
      <tr key={index}>
        <td>
          <span className="screen-index">{index + 1}.</span>
          <FormControl>
            <TextField
              variant="standard"
              name="itemName"
              placeholder="App Icon"
              onChange={(evnt) => handleChange(index, evnt)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTableRows()
                  e.preventDefault();
                }
              }}
              value={itemName}
            />
          </FormControl>
          <Button
            className="secondary-button add-subRow"
            onClick={() => addSubRows(index)}
          >
            <img src={addIcon} alt="add" width={10} />
          </Button>
          {subItems?.length > 0
            ? subItems.map((elem, subIndex) => {
              //const { subItems } = elem;
              return (
                <>
                  <td className="subRowInput">
                    <span className="sub-screen-index">{index + 1}.{subIndex + 1}.</span>
                    <Button
                      className="secondary-button add-subRow"
                      onClick={() => addSubRows(index, subIndex)}
                    >
                      <img src={addIcon} alt="add" width={10} />
                    </Button>
                    <FormControl key={elem.subIndex}>
                      <TextField
                        type="text"
                        key={subIndex}
                        variant="standard"
                        name="subItems"
                        placeholder="Login Screen"
                        onChange={(evnt) => handleExtraChange(index, subIndex, evnt)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSubRows(index, subIndex)
                            e.preventDefault()
                          }
                        }}
                        value={elem}
                      />
                    </FormControl>
                    <span
                      className="subdata"
                      onClick={() => deleteTableExtraRows(index, subIndex)}
                    ></span>
                  </td>
                </>
              );
            })
            : ""}

        </td>

        <td>
          <FormControl>
            <TextField
              variant="standard"
              name="hours"
              placeholder="2"

              onChange={(evnt) => handleChange(index, evnt)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
              value={hours}
            />
          </FormControl>
        </td>

        <td>
          <Button
            className="secondary-button  timeline-action-btn"
            onClick={(e) => deleteTableRows(index)}
          >
            <img src={closeIcon} alt="close" width={8} />
          </Button>
          {/* <Button
            className="secondary-button timeline-action-btn"
            onClick={() => addTableRows()}
          >
            <img src={addIcon} alt="add" width={12} />
          </Button> */}

          {/* <span
              className="data"
              onClick={(e) => deleteTableRows(index)}
            ></span> */}
        </td>
      </tr>
    )
  });
};

export default TableRows;
