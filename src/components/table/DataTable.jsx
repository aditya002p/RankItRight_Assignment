import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS } from "./TableColumns";
import { GlobalFilter } from "./GlobalFilter";
import { TablePagination } from "./TablePagination";
import { useData } from "../../context/DataContext";
import "../../styles/table.css";

const DataTable = () => {
  const { data, isLoading, error } = useData();
  const columns = useMemo(() => COLUMNS, []);
  const memoizedData = useMemo(() => data || [], [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
    setPageSize,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: memoizedData,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className="sort-indicator">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {memoizedData.length > 0 ? (
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
        />
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  );
};

export default DataTable;
