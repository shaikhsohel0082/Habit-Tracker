import { Habits } from "../redux/habitRedux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { increaseCount } from "../redux/habitRedux";
import { decreaseCount } from "../redux/habitRedux";
import { setYesClicked } from "../redux/habitRedux";
import { setNoClicked } from "../redux/habitRedux";
import { useDispatch } from "react-redux";
import Styles from "./week.module.css";
import { useState } from "react";

export default function Week() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const habits = useSelector(Habits);
  const habit = habits.find((i) => id == i.id);

  if (!habit || !habit.date) {
    return <div className={Styles.error}>Opps! no habbits yet</div>;
  }

  const yes = habit.yesClicked;
  const no = habit.noClicked;
  const isoString = habit.date;
  const date = new Date(isoString);
  let today = date.getDay();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const dayOfWeek = date.getDay(); // Get day of the week (0 for Sunday, 1 for Monday, etc.)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek); // Start of the week (Sunday)
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() - (dayOfWeek - 6)); // End of the week (Saturday)

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate.toLocaleDateString("en-GB", options));
  }

  return (
    <>
      <h1>{habit.name}</h1>
      <div className={Styles.week}>
        {weekdays.map((day, index) => (
          <div key={index}>
            {index <= today ? (
              <>
                <p>{day}</p>
                <p>{weekDates[index]}</p>
                <img
                  onClick={() => {
                    dispatch(increaseCount(id));
                    dispatch(setYesClicked({ id, day }));
                  }}
                  className={
                    index > today ||
                    (index === today && date > new Date()) ||
                    yes.includes(day)
                      ? Styles.blur
                      : null
                  }
                  src="https://cdn-icons-png.flaticon.com/128/9427/9427117.png"
                  alt="Yes"
                />
                <img
                  onClick={() => {
                    dispatch(decreaseCount(id));
                    dispatch(setNoClicked({ id, day }));
                  }}
                  className={
                    index > today ||
                    (index === today && date > new Date()) ||
                    !yes.includes(day)
                      ? Styles.blur
                      : null
                  }
                  src="https://cdn-icons-png.flaticon.com/128/6711/6711656.png"
                  alt="No"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6645/6645118.png"
                  alt="Maybe"
                  className={Styles.maybe}
                />
              </>
            ) : (
              <p>You can't set<br /> beyond today</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
