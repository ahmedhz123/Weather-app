import Button from "@mui/material/Button";
import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
moment.locale("ar"); // set moment to use Arabic locale
let axiosCancel = null;
const App = () => {
  const { t, i18n } = useTranslation();
  // States
  let [info, setInfo] = useState({
    temp: null,
    desc: "",
    min: null,
    max: null,
    icon: "",
  });
  const [dateAndtime, setDateAndTime] = useState("");
  const [lang, setLang] = useState("ar");
  useEffect(() => {
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    const fetchData = async () => {
      let res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=44fee56d3f4b91b7015ac14f4e960d49",
        {
          cancelToken: new axios.CancelToken((c) => (axiosCancel = c)),
        }
      );
      let data = res.data;
      setInfo({
        temp: Math.round(data.main.temp - 272.15),
        desc: data.weather[0].description,
        min: Math.round(data.main.temp_min - 272.15),
        max: Math.round(data.main.temp_max - 272.15),
        icon: data.weather[0].icon,
      });
    };
    fetchData();
    // cleanup function
    return () => {
      axiosCancel();
    };
  }, []);
  return (
    <>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={
          "container w-[58%] mx-auto h-[100vh] flex items-center flex-col justify-center gap-[25px] text-white"
        }
      >
        <Card
          className={"lg:w-full card sm:w-fit flex-col sm:h-fit md:flex-row "}
          sx={{ borderRadius: 5, padding: 1 }}
          style={{
            backgroundColor: "#0a3e98",
            height: "fit-content",
            color: "inherit",
            boxShadow: "0px 10px 2px 2px rgb(0,0,0,0.05)",
          }}
        >
          <CardContent className="flex items-center flex-col md:flex-row text-center">
            <Typography variant="h1" className={"heading-1"}>
              {t("Cairo")}
            </Typography>
            <Typography className={"heading-2 self-end mr-2 text-center"} variant="h5">
              {dateAndtime}
            </Typography>
          </CardContent>
          <hr className="w-[98%] mx-auto border-[2px]" />
          <div className="container_node flex items-center justify-between px-3 sm:flex-col sm:gap-0 md:flex-row sm:text-center">
            <CardContent
              className={"flex flex-col items-center justify-center"}
            >
              <div className="flex items-center gap-[15px]">
                <Typography variant="h1" className="ibm">
                  {info.temp}&deg;C
                </Typography>
                <div className="img">
                  <img
                    className="w-full h-full"
                    src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}
                  />
                </div>
              </div>
              <Typography variant="h4" className="ibm">
                {t(info.desc)}
              </Typography>
              <div className="details flex gap-[30px] items-center justify-center">
                <Typography variant="h6" className="ibm">
                  {t("Min")}:{info.min}&deg;C
                </Typography>
                <Typography variant="h6" className="ibm">
                  |
                </Typography>
                <Typography variant="h6" className="ibm">
                  {t("Max")}:{info.max}&deg;C
                </Typography>
              </div>
            </CardContent>
            <CloudIcon className={"icon "} sx={{ fontSize: 300 }} />
          </div>
        </Card>
        <Button
          variant="text"
          className="self-end btn"
          onClick={() => {
            if (lang === "ar") {
              i18n.changeLanguage("en");
              setLang("en");
              moment.locale("en");
            } else {
              i18n.changeLanguage("ar");
              setLang("ar");
              moment.locale("ar");
            }
          }}
          sx={{
            fontSize: "1.1rem",
          }}
        >
          {lang === "ar" ? "انجليزي" : "Arabic"}
        </Button>
      </div>
    </>
  );
};

export default App;
