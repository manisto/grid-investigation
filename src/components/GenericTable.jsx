import { useTable, useSortBy, useFilters, useGlobalFilter, useExpanded, usePagination, useRowSelect, useGroupBy } from "react-table";
import dataJson from '../data.json'
import { COLUMNS } from "./Columns";
import { useMemo } from 'react';
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { TbArrowsSort } from "react-icons/tb";
import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";
import { useState } from 'react';


const GenericTable = () => {

    // Here we flatMap the indivdual transaction arrays into one flat array

    const flatData = dataJson.flatMap((transactionGroup) => transactionGroup.transactions);

    console.log("flatData", flatData);

    // Column definitions and groupBy as well as thge main data source is declared

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => flatData, [])
    const groupBy = useMemo(() => ["patient.name"], []);

    // onClick innerText Variable is declared

    const [tdValue, setTdValue] =  useState(false);
    const [tdValueArray, setTdValueArray] =  useState(false);

    // React-table hooks are declared and the row selection component is rendered into the table

    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            groupBy
        }
    },
    useGlobalFilter,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    hooks => {
        hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ])
    }
    )

    // Props from TableInstance is destructured

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, getRowProps, state: {expanded, selectedRowIds}, setGlobalFilter} = tableInstance

    //rows.length should possible be rendered along with some form of pagination. Check the pagination

    console.log("rowsLength", rows.length);

    console.log("tdValue", tdValue);

    console.log("headerGroups", headerGroups);

    // console.log("tdValueArray", tdValueArray);


    // UI is rendered along with a bit of contitional rendering of sortBy buttons and their respective alt-tags
    // as well as a click event saving innerText values of the tabel divitions being clicked - these could also be pushed into an array - could this be useful?
    // At the bottom a rows.length counter is rendered - useful?


    return (
        <>
        <table {...getTableProps()}>
            
            <thead>
               
               <tr className="topBar"></tr>
                {
                    headerGroups.map((headerGroup) => (            
                        <tr className="theadRow" key="" {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>

                                    <div className="columnThDiv">
                                        <div className="columnThDiv__headerText">{column.render('Header')}</div>
                                        <button className="sortBtn theadBtn" title={column.isSorted ? (column.isSortedDesc ? "Sorterer faldende, klik for at sortere stigende" : "Sorterer stigende, klik for fjerne sortering"): "Sortér kolonne"} alt={column.isSorted ? (column.isSortedDesc ? "Sorterer faldende, klik for at sortere stigende" : "Sorterer stigende, klik for fjerne sortering"): "Sortér kolonne"} {...column.getSortByToggleProps()}>{column.isSorted ? (column.isSortedDesc ? <TbSortDescending/> : <TbSortAscending/>): <TbArrowsSort/>}</button>
                                        <div>{column.canFilter ? column.render('Filter') : null }</div>
                                    </div>
                                    
                                    
                                </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row, i) => {
                        prepareRow(row)
                        return (
                                <>
                                <tr key={i} {...row.getRowProps()}>
                                    {
                                        row.cells.map( cell => {
                                            return  (
                                                <td {...cell.getCellProps()} onClick={(e) => {{setTdValue(e.target.innerText)}}}>
                                                    {cell.render('Cell')}
                                                </td>  
                                            )            
                                        })
                                    }
                                </tr>
                                </>
                            )
                    })
                }
            </tbody>
        </table>
        <p className="rowsLength">{rows.length}</p>
       
        </>
    )
}



export default GenericTable;