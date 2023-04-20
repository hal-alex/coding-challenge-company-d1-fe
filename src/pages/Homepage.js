import React, { useState, useEffect } from "react"
import { Box, Typography, TextField } from "@mui/material"
import axios from "axios"
import ElevatorTable from "../components/ElevatorTable"

const Homepage = () => {
  const styles = {
    hero: {
      background: "#F5F5F5",
      display: "flex",
      height: "300vh",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "35px",
      padding: "44px",
      textAlign: "center",
    },
    buttonContainer: {
      width: "100%",
    },
    ctaButton: {
      m: "20px",
    },
  }

  const [responseData, setResponseData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialRender, setInitialRender] = useState(true)
  const [requestedFloor, setRequestedFloor] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (initialRender) {
          const { data } = await axios.get(
            "http://127.0.0.1:8000/api/elevators/get_or_create/",
          )
          setResponseData(data)
          console.log(data)
        } else {
          const { data } = await axios.patch(
            "http://127.0.0.1:8000/api/elevators/get_or_create/",
            {
              requestedFloor: requestedFloor,
            },
          )
          setResponseData(data)
          console.log(data)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    setInitialRender(false)
  }, [requestedFloor])

  const handleChange = (e) => {
    const floor = e.target.value
    if (floor) {
      setRequestedFloor(parseInt(floor))
    }
  }

  return (
    <Box sx={styles.hero}>
      <Box sx={styles.wrapper}>
        <Typography variant="h4">Welcome to the elevator panel!</Typography>
        <Typography variant="h5">
          Please enter the floor you'd like to go to
        </Typography>
        <TextField
          id="standard-helperText"
          label="Floor"
          defaultValue="0"
          helperText="Floors can be negative or positive integers or 0"
          variant="standard"
          onChange={handleChange}
        />
        <ElevatorTable
          responseData={responseData}
          isLoading={isLoading}
        ></ElevatorTable>
      </Box>
    </Box>
  )
}

export default Homepage
