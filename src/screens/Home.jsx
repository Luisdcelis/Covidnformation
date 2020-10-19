import { Divider, Grid } from "@material-ui/core";
import "fontsource-roboto";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NavBarCovid from "../components/NavBarCovid";
import Stats from "../components/Stats";
import News from "../components/News";
import { getNews } from "../services/api";

function Home() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getNews();
      setNews(res.articles);
    })();
  }, []);

  // let today = new Date();
  // const dd = String(today.getDate()).padStart(2, "0");
  // const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // const yyyy = today.getFullYear();

  // today = dd + "/" + mm + "/" + yyyy;
  moment.locale("es");

  return (
    <>
      <NavBarCovid />

      <Grid container>
        <Grid item xs={8} style={{ padding: "0px 50px" }}>
          <News news={news}></News>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <Grid
            item
            style={{
              position: "absolute",
              padding: "30px 75px",
            }}
          >
            <Stats />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
