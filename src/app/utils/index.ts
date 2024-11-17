const isValidCsv = (text: string) => {
  if (!text.trim()) {
    return false; // Empty text is not valid
  }

  // Split the text into rows
  const rows = text.trim().split("\n");
  if (rows.length < 2) {
    return false; // A valid CSV should have at least a header and one row
  }

  // Determine the separator (comma or tab)
  const separator = rows[0].includes(",")
    ? ","
    : rows[0].includes("\t")
    ? "\t"
    : null;
  if (!separator) {
    return false; // No valid separator found
  }

  // Get the number of columns in the header row
  const columnCount = rows[0].split(separator).length;

  // Check each row has the same number of columns
  for (const row of rows) {
    if (row.split(separator).length !== columnCount) {
      return false;
    }
  }

  return true; // All rows have the same column count
};

export { isValidCsv };
