import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import "./mainPage.css";

export default function TitlebarBelowImageList() {
  return (
    <div>
      <div className="tabs">
        <div className="one">
          <h3>Earnings</h3>
          <p>₹10,00000</p>
        </div>
        <div className="two">
          <h3>Doctors</h3>
          <p>2000</p>
        </div>
        <div className="three">
          <h3>Patients Admitted</h3>
          <p>6000</p>
        </div>
        <div className="four">
          <h3>Online consultation Timing</h3>
          <p>Change timings</p>
        </div>
      </div>
      <div className="imageList">
        <ImageList>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                sx={{ margin: "auto" }}
                src={`${item.img}`}
                //   srcSet={`${item.img}`}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} position="below" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: "https://www.researchgate.net/profile/Md-Rabiul-Alam/publication/291345204/figure/fig1/AS:435210878754816@1480773767113/Figure-1-Pie-chart-showing-the-number-percentages-of-patients-attended-at-different.png",
    title: "EXPENDITURE",
  },
];
