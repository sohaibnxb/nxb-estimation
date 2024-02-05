import { useState } from 'react'
import { useDispatch, } from 'react-redux';

import _ from 'lodash'
import { Button, InputBase } from "@mui/material";
import addIcon from "../../../assets/images/add.svg"
import TableRows from "./TableRows";
import { addSubRowsReducer, addTableRowsReducer, deleteTableExtraRowsReducer, deleteTableRowsReducer, updateItemValuesReducer, updateSubItemValuesReducer, updateTimelineTitle } from '../redux/timelineSllice';

const TimlineTable = ({ timeline = null, }) => {

    const timelineItems = _.cloneDeep(timeline?.items)


    const [rowsData, setRowsData] = useState(timelineItems || []);
    const [rowsExtraData, setRowsExtraData] = useState([]);
    // const [showRow, setShowRow] = useState(false);
    const [showExtraRow, setShowExtraRow] = useState(true);
    // const [timelineTotalHours, setTimelineTotalHours] = useState(() => rowsData?.reduce((total, item) => (total + (item.hours ? parseInt(item.hours) : 0)), 0))

    const dispatch = useDispatch()

    const timelineId = timeline?.id;

    const handleTitleChange = (event) => {
        dispatch(updateTimelineTitle({ timelineId, title: event.target.value }))
    }

    const addTableRows = () => {
        const rowsInput = {
            itemName: "",
            hours: "",
            subItems: []
        };
        setRowsData([...rowsData, rowsInput]);
        // setShowRow(true);
        dispatch(addTableRowsReducer({ timelineId }))
    };
    // add sub row
    const addSubRows = (index, subIndex) => {
        var temp = [...rowsData];
        temp[index].subItems.splice(subIndex + 1, 0, "");
        setRowsData([...temp]);
        dispatch(addSubRowsReducer({ timelineId, index, subIndex }))
    };
    // delete rows
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        if (rows.length === 0) {
            // setShowRow(false);
        }
        setRowsData(rows)
        dispatch(deleteTableRowsReducer({ timelineId, index }))
    };
    //delete sub rows
    const deleteTableExtraRows = (index, subIndex) => {
        var temp = [...rowsData];
        temp[index].subItems.splice(subIndex, 1);
        setRowsData([...temp]);
        dispatch(deleteTableExtraRowsReducer({ timelineId, index, subIndex }))
    };
    // change input and getting values
    const handleChange = async (index, evnt) => {

        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
        dispatch(updateItemValuesReducer({ timelineId, name, index, value }))
    };

    // change sub input and getting values
    const handleExtraChange = async (index, subIndex, evnt) => {
        const temp = [...rowsData];
        const { value } = evnt.target;
        temp[index].subItems[subIndex] = value;
        setRowsData([...temp]);
        dispatch(updateSubItemValuesReducer({ timelineId, index, value, subIndex }))
    };

    return (
        <table className="table estimation-table">
            <thead>
                <tr>
                    <th>
                        <InputBase
                            sx={{ m: 0, p: 0, flex: 1, color: '#0278CE', }}
                            placeholder="Type to add title"
                            defaultValue={timeline?.timelineTitle}
                            onChange={(event) => handleTitleChange(event)}
                            inputProps={{ 'aria-label': 'TYPE TO ADD TITLE', sx: { p: 0, '&::placeholder': { opacity: 1, } } }}
                            onKeyPress={(e) => {
                                e.stopPropagation()
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                }
                            }
                            }
                        />
                    </th>


                    <th>
                        {/* <div className="assign-selectbox select-timeMode">
                            <select
                            id="timeMode"
                            name="users"
                            className="assign-resources-selectbox est-timeMode-selectbox"
                            onChange={(e) => handleOptionChange(e)}
                            >
                            {estimatedMode.map((option, key) => (
                                <option key={key} value={key}>
                                {option}
                                </option>
                            ))}
                            </select>
                            <img src={SelectIcon} alt="select" />
                        </div> */}
                        EST. (Hours)
                    </th>
                    <th></th>
                </tr>
            </thead>

            {rowsData.length === 0 ? (
                <tbody>

                    <p onClick={addTableRows}>
                        Type here and enter your estimate
                    </p>

                    <TableRows
                        rowsData={rowsData}
                        rowsExtraData={rowsExtraData}
                        deleteTableRows={deleteTableRows}
                        handleChange={handleChange}
                        handleExtraChange={handleExtraChange}
                        addSubRows={addSubRows}
                        showExtraRow={showExtraRow}
                        addTableRows={addTableRows}
                        deleteTableExtraRows={deleteTableExtraRows}
                    />

                    <>
                        <tr className="totalRow">
                            <td>Total</td>
                            <td>{timeline?.totalHours}</td>
                            <td></td>
                        </tr>
                        <Button onClick={addTableRows} className="AddRow">
                            Add new Row
                        </Button>
                    </>

                </tbody>
            ) : (

                <tbody>
                    <TableRows
                        rowsData={rowsData}
                        rowsExtraData={rowsExtraData}
                        deleteTableRows={deleteTableRows}
                        handleChange={handleChange}
                        handleExtraChange={handleExtraChange}
                        addSubRows={addSubRows}
                        showExtraRow={showExtraRow}
                        addTableRows={addTableRows}
                        deleteTableExtraRows={deleteTableExtraRows}
                    />
                    <Button
                        className="add-new-row"
                        onClick={() => addTableRows()}
                    >
                        <img src={addIcon} alt="add" width={10} />
                    </Button>
                    {
                        <>
                            <tr className="totalRow">
                                <td>Total</td>
                                <td>{timeline?.totalHours}</td>
                                <td></td>
                            </tr>
                            <Button onClick={addTableRows} className="AddRow">
                                Add new Row
                            </Button>
                        </>
                    }
                </tbody>
            )}
        </table>
    )
}

export default TimlineTable




