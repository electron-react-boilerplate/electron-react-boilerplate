import axios from "axios";
import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";



export default function View()
{
  const [schedule, setSchedule] = React.useState( <div>Загрузка...</div> );
  const [searchParams] = useSearchParams();

  axios.get("https://skoipt.ru/images/rs/Schedule_htm/"+searchParams.get("group"))
    .then((response) => {
      setSchedule(response.data)
    })
    .catch((error) => {
      console.log("load failed" + error)
    });

  return (
    <div>
      {searchParams.get("group")}
      {schedule}
    </div>
  );
}