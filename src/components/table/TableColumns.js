export const COLUMNS = [
  {
    Header: "Domain",
    accessor: "domain",
    sortType: "alphanumeric",
  },
  {
    Header: "Niche 1",
    accessor: "niche1",
  },
  {
    Header: "Niche 2",
    accessor: "niche2",
  },
  {
    Header: "Traffic",
    accessor: "traffic",
    sortType: "numeric",
    Cell: ({ value }) => value?.toLocaleString() || "0",
  },
  {
    Header: "DR",
    accessor: "dr",
    sortType: "numeric",
  },
  {
    Header: "DA",
    accessor: "da",
    sortType: "numeric",
  },
  {
    Header: "Language",
    accessor: "language",
  },
  {
    Header: "Price",
    accessor: "price",
    sortType: "numeric",
    Cell: ({ value }) => `$${value?.toLocaleString() || "0"}`,
  },
  {
    Header: "Spam Score",
    accessor: "spamScore",
    sortType: "numeric",
  },
];
