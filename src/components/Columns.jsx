import ColumnFilter from '../components/ColumnFilter.js'
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import genericTableCss from "./GenericTable.css"



export const COLUMNS = [
      {
        // Build our expander column
        id: 'expander', // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <BsChevronDown size={18}/> : <BsChevronRight size={18}/>}
          </span>
        ),
        Cell: ({ row, rows, toggleRowExpanded }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                },
                onClick: () => {
                  const expandedRow = rows.find(row => row.isExpanded);
                  // ExpandedRow: rows, som er expanderede

                  if (expandedRow) {
                    const isSubItemOfRow = Boolean(
                      expandedRow && row.id.split(".")[0] === expandedRow.id
                    );

        

                    if (isSubItemOfRow) {
                      const expandedSubItem = expandedRow.subRows.find(
                        subRow => subRow.isExpanded
                      );

                      if (expandedSubItem) {
                        const isClickedOnExpandedSubItem =
                          expandedSubItem.id === row.id;
                        if (!isClickedOnExpandedSubItem) {
                          toggleRowExpanded(expandedSubItem.id, false);
                        }
                      }
                    } else {
                      toggleRowExpanded(expandedRow.id, false);
                    }
                    
                  }
                  else {
                  row.toggleRowExpanded();
                  console.log("unExpand");  
                  }

                }
              })}
            >
              {row.isExpanded ? <BsChevronDown size={15}/> : <BsChevronRight size={15}/>}
            </span>
            ) : null,
        },
        {
          Header: 'Debitor',
          accessor: 'debtor.patientKey',
          Filter: ColumnFilter

        },
        {
          Header: 'Borger',
          accessor: 'patient.name',
          Filter: ColumnFilter
        },
        {
            Header: 'Leverandør',
            accessor: 'supplier.name',
            Filter: ColumnFilter
        },
        {
            Header: 'Ydelse',
            accessor: 'name',
            Filter: ColumnFilter
        },
        {
          Header: 'Periode',
          accessor: 'billingStartDate',
          Filter: ColumnFilter
        },
        {
          Header: 'Beløb',
          accessor: 'amount',
          Filter: ColumnFilter
        },
        {
          Header: 'Konto',
          accessor: 'accountDisplayValue',
          Filter: ColumnFilter
        },
        {
          Header: 'Betalingsart',
          accessor: 'accountPaymentType',
          Filter: ColumnFilter
        },
        {
          Header: 'Status',
          accessor: 'state',
          Filter: ColumnFilter
        },
        {
          Header: 'Overført',
          accessor: 'ExportTime',
          Filter: ColumnFilter
        },
        

    ]

// Herover defineres columns med id, Header, cell, accessor og Filter
// Vi skal finde ud af, om korrekt formattering af dato, valuta mv og rendering af oversættelser og fx relevante status-beskeder, sker her(?)

//Dette array skal mulivis ind og ligge i table-komponentet, hvor header/accesser skal være variabler via props - Stadig relevant?