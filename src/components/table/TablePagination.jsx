import React from "react";

export const TablePagination = ({
  pageIndex = 0,
  pageSize = 10,
  pageCount = 0,
  canPreviousPage = false,
  canNextPage = false,
  setPageSize,
  previousPage,
  nextPage,
  gotoPage,
}) => {
  // Ensure pageIndex and pageCount are valid numbers
  const currentPage = Number.isInteger(pageIndex) ? pageIndex : 0;
  const totalPages = Number.isInteger(pageCount) ? pageCount : 0;

  // Calculate the displayed page number (1-based for display)
  const displayedPage = totalPages > 0 ? currentPage + 1 : 0;

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="pagination-button"
          aria-label="First Page"
        >
          {"<<"}
        </button>
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="pagination-button"
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span className="pagination-info">
          {totalPages > 0 ? (
            <>
              Page{" "}
              <strong>
                {displayedPage} of {totalPages}
              </strong>
            </>
          ) : (
            <strong>No pages</strong>
          )}
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="pagination-button"
          aria-label="Next Page"
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(totalPages - 1)}
          disabled={!canNextPage}
          className="pagination-button"
          aria-label="Last Page"
        >
          {">>"}
        </button>
      </div>

      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="page-size-select"
        aria-label="Rows per page"
      >
        {[10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
};
