import Button from "@mui/material/Button";
import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "./WeatherApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
moment.locale("ar"); // set moment to use Arabic locale
const App = () => {
  const dispatch = useDispatch();
  let loading = useSelector((state) => state.weatherApiReducer.loading);
  let info = useSelector((state) => state.weatherApiReducer.weather);
  const { t, i18n } = useTranslation();
  // States
  const [dateAndtime, setDateAndTime] = useState("");
  const [lang, setLang] = useState("ar");
  useEffect(() => {
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    dispatch(fetchWeatherData());
    // cleanup function
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
            <Typography
              className={"heading-2 self-end mr-2 text-center"}
              variant="h5"
            >
              {dateAndtime}
            </Typography>
          </CardContent>
          <hr className="w-[98%] mx-auto border-[2px]" />
          <div className="container_node flex items-center justify-between px-3 sm:flex-col sm:gap-0 md:flex-row sm:text-center">
            <CardContent
              className={"flex flex-col items-center justify-center"}
            >
              <div className="flex items-center gap-[15px]">
                {loading && <CircularProgress />}
                <Typography variant="h1" className="ibm">
                  {info.temp}&deg;C
                </Typography>
                <div className="img">
                  <img
                    className="w-full h-full"
                    src={info.icon}
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
