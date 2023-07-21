import React from "react";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  textFieldClasses,
} from "@mui/material";
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
    const { screenName, hours, screenSections } = data;


    return (
      <>
        <tr key={index}>
          <td>
            <span className="screen-index">{index + 1}.</span>
            <FormControl>
              <TextField
                variant="standard"
                name="screenName"
                placeholder="App Icon"
                onChange={(evnt) => handleChange(index, evnt)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTableRows()
                  }
                }}
                value={screenName}
              />
            </FormControl>
            <Button
              className="secondary-button add-subRow"
              onClick={() => addSubRows(index)}
            >
              +
            </Button>
            {screenSections.length > 0
              ? screenSections.map((elem, subIndex) => {
                //const { screenSections } = elem;
                return (
                  <>
                    <td className="subRowInput">
                      <span className="sub-screen-index">{index + 1}.{subIndex + 1}.</span>
                      <Button
                        className="secondary-button add-subRow"
                        onClick={() => addSubRows(index, subIndex)}
                      >
                        +
                      </Button>
                      <FormControl key={elem.subIndex}>
                        <TextField
                          type="text"
                          key={subIndex}
                          variant="standard"
                          name="screenSections"
                          placeholder="Login Screen"
                          onChange={(evnt) => handleExtraChange(index, subIndex, evnt)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addSubRows(index, subIndex)
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
                value={hours}
              />
            </FormControl>
          </td>

          <td>
            <Button
              className="secondary-button  timeline-action-btn"
              onClick={(e) => deleteTableRows(index)}
            >
              x
            </Button>
            <Button
              className="secondary-button timeline-action-btn"
              onClick={() => addTableRows()}
            >
              +
            </Button>

            {/* <span
              className="data"
              onClick={(e) => deleteTableRows(index)}
            ></span> */}
          </td>
        </tr>
        {/* <tr className="totalRow">
          <td>Total</td>
          <td>{totalhours}</td>
        </tr> */}
      </>
    );
  });
};

export default TableRows;
