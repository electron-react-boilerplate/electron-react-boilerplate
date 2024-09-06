import { Alert, CircularProgress, Paper } from "@mui/material";
import axios from "axios";
import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";



export default function View()
{
  const [schedule, setSchedule] = React.useState( <CircularProgress sx={{marginTop: "280px"}}/> );
  const [searchParams] = useSearchParams();
  let url = "https://skoipt.ru/images/rs/Schedule_htm/" + searchParams.get("group") + ".htm";

  console.log("request: " + url)

  axios.get(url)
    .then((response) => {
      const htmlDoc = new DOMParser()
        .parseFromString(response.data, 'text/html');
        
      //let tableDoc = htmlDoc.querySelector(".MsoNormalTable")?.outerHTML 
      //let a: JSX.Element = parse(tableDoc ?? "")
      //
      //setSchedule(a)
    })
    .catch((error) => {
      console.log("load failed" + error)
    });

  return (
    <Paper 
      sx={{
        width: '1030px',
        minHeight: '600px',
        height: 'fit-content',
        textAlign: 'center',
        margin: 'auto',
        marginTop: '140px'
      }}
    >
      {schedule}
    </Paper>
  );
}