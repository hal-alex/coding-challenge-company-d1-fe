import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, CircularProgress, Box, Typography, Tab } from "@mui/material"
import { Link } from "react-router-dom"
import CreateElevator from "./CreateElevator"

const ElevatorTable = ({ isLoading, responseData }) => {
  const tableHeadings = [
    "Elevator Name",
    "Elevator Service Starting Floor",
    "Elevator Service Ending Floor",
    "",
  ]

  return (
    <>
      {isLoading && (
        <Box sx={{ mt: "50px", width: "100%" }}>
          <Typography>Loading elevators...</Typography>
          <CircularProgress sx={{ mt: "20px" }}></CircularProgress>
        </Box>
      )}
      {!isLoading && (
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeadings.map((item, index) => {
                  return (
                    <TableCell align="left" key={index}>
                      {item}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {responseData.map((row, index) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell align="left">{row.elevatorName}</TableCell>
                      <TableCell align="left">{row.startingFloor}</TableCell>
                      <TableCell align="left">{row.endingFloor}</TableCell>
                      <TableCell align="left">
                        <Link>
                          <Button variant="contained">Take Elevator</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      {responseData.length == 0 && <CreateElevator></CreateElevator>}
    </>
  )
}

export default ElevatorTable
