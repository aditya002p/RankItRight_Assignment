const SHEET_ID = "1K_JPaFSR2erWdUlNsZximyv_QKfaiu68SIgMZNgwXmc";
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const SHEET_RANGE = "Sheet1";

export const fetchSheetData = async () => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const { values } = await response.json();
    const rows = values.slice(1); // Skip header row

    return rows.map((row) => ({
      domain: row[0] || "",
      niche1: row[1] || "",
      niche2: row[2] || "",
      traffic: parseInt(row[3]) || 0,
      dr: parseInt(row[4]) || 0,
      da: parseInt(row[5]) || 0,
      language: row[6] || "",
      price: parseFloat(row[7]) || 0,
      spamScore: parseInt(row[8]) || 0,
    }));
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
};
