import mssql from "mssql";

const withTryCatch = (func) => async (req, res) => {
  try {
    await func(req, res); // Call the function
  } catch (err) {
    res.status(500).send("Error connecting to the database"); // Handle the error
  } finally {
    mssql.close(); // Close the connection
  }
};
export default withTryCatch;
