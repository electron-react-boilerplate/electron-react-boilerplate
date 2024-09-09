import { Alert, Button, ButtonBase, CircularProgress, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from 'framer-motion';
import "./View.css"

function getNextMondayTimestamp() {
  const now = new Date();
  const currentDay = now.getDay();
  const daysUntilMonday = (currentDay === 0 ? 0 : 7 - currentDay);
  const nextMonday = new Date(now.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday.getTime();
}

function Parse(group: string, handleChange: Function)
{
  let url = "https://skoipt.ru/images/rs/Schedule_htm/" + group + ".htm";

  console.log("request: " + url)

  axios.get(url, { responseType: 'arraybuffer' })
  .then((response) => {
    /*
     * schedule - matrix
     * [i] - rows
     * [j] - cells
     * 
     * [i][j] -> [
     *  text, width, height, colspan, rowspan
     * ]
    */
    let schedule: any = []
    const decoder = new TextDecoder('windows-1251');
    const decodedData = decoder.decode(new Uint8Array(response.data));
    const htmlDoc = new DOMParser().parseFromString(decodedData, 'text/html');
    console.log(htmlDoc)
    let table = htmlDoc.querySelectorAll(".MsoNormalTable")[1];
    
    let rows = table.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++)
    {
      let cells = rows[i].querySelectorAll("td");
      schedule[i] = [];
      for (let j = 0; j < cells.length; j++)
      {
        let style: any = [];

        style.push(cells[j].outerText);
        style.push(cells[j].style.width);
        style.push(cells[j].style.height);
        style.push(cells[j].colSpan);
        style.push(cells[j].rowSpan);

        schedule[i][j] = style;
      }
    }
    
    handleChange(schedule)

    let schedules = JSON.parse(localStorage.getItem("schedules") ?? "{}");

    schedules[group] = {}
    schedules[group].expires = getNextMondayTimestamp();
    schedules[group].schedule = schedule

    localStorage.setItem("schedules", JSON.stringify(schedules))
  })
  .catch((error) => {
    console.log("load failed: " + error)
  });
}

function Load(group: string, handleChange: Function)
{
  let schedules = JSON.parse(localStorage.getItem("schedules") ?? "0");
  
  if (schedules == null || 
    schedules[group] == null ||
    schedules[group].expires < Date.now())
  {
    Parse(group, handleChange)
  }
  else
  {
    handleChange(schedules[group].schedule)
  }
}

export default function View()
{
  const [schedule, setSchedule] = React.useState( <CircularProgress sx={{marginTop: "280px"}}/> );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function changeSchedule(newSchedule: any[])
  {
    console.log(newSchedule)
    let rows: JSX.Element[] = []

    newSchedule.forEach((trs: any[]) => 
    {
      let tr: JSX.Element[] = []

      trs.forEach((td: any[]) => 
      {
        tr.push(
          <td 
            colSpan={td[3]} 
            rowSpan={td[4]}
            style={{
              width: td[1],
              height: td[2],
            }}
          >
            {td[0]}
          </td>
        )
      });

      rows.push(<tr>{tr}</tr>)
    });

    setSchedule(
      <tbody className="View__table">
        {rows}
      </tbody>
    );
  }

  useEffect(() => {
    Load(searchParams.get("group") ?? "", changeSchedule) 
  }, [])
  
  return (
    <div>
      <Paper 
        sx={{
          minWidth: '1030px',
          minHeight: '200px',
          height: 'fit-content',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.5)'
        }}
      >
        {schedule}
      </Paper>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
        <Button 
          onClick={() => navigate('/schedule')}
          variant="contained"
          sx = {{
            position: 'absolute',
            width: 240,
            height: 75,
            borderRadius: '15px',
            left: "calc(50% - 700px)",
            bottom: '30px',
          }}>
          Назад
        </Button>
      </motion.div>
    </div>
  );
}