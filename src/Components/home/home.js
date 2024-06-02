import { Habits } from "../redux/habitRedux";
import { useSelector } from "react-redux";
import { deleteHabit } from "../redux/habitRedux";
import { useDispatch } from "react-redux";
import Styles from "./home.module.css";
import { NavLink } from "react-router-dom";
export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector(Habits);

  return (
    <>
      {habits.length == 0 ? (
        <h1>No habits added yet</h1>
      ) : (
        <div className={Styles.home}>
          {habits.map((habit) => (
            <>
              {console.log(habit)}
              <div className={Styles.habitCard}>
                <div>
                  <span className={Styles.name}>{habit.name} </span>
                  <span>{habit.yesClicked.length}/7</span>
                </div>
                <div>
                  <NavLink to={`/week/${habit.id}`}>
                    <span>
                      <img
                        className={Styles.btn}
                        src="https://cdn-icons-png.flaticon.com/128/6159/6159781.png"
                        alt="week"
                      />
                    </span>
                  </NavLink>
                  <span onClick={() => dispatch(deleteHabit(habit.id))}>
                    <img
                      className={Styles.btn}
                      src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                      alt="delete"
                    />
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
