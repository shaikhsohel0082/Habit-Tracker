import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addHabit, Habits } from "../../Components/redux/habitRedux";
import Styles from "./habit.module.css";
import { useEffect, useState } from "react";

export default function Habit() {
  const [habit, setHabit] = useState({
    id: 0,
    name: "",
    count: 0,
    date: null,
    yesClicked: [],
  });
  const [habitAdded, setHabitAdded] = useState(false);
  const [nextId, setNextId] = useState(1); // Initialize the next ID
  const dispatch = useDispatch();
  const habits = useSelector(Habits);

  useEffect(() => {
    console.log(habits);
  }, [habits]);

  const handleAddHabit = () => {
    const habitWithTimestamp = {
      ...habit,
      id: nextId, // Use the next ID
      date: new Date().toISOString(),
    };
    dispatch(addHabit(habitWithTimestamp));
    setNextId(nextId + 1); // Increment the next ID
    setHabit({
      ...habit,
      name: "",
      count: 0,
      date: null,
    });
    setHabitAdded(!habitAdded);
  };

  return (
    <div className={Styles.habit}>
      <div className={Styles.modal}>
        <h1>Add Habit name</h1>
        <div>
          <input
            type="text"
            placeholder="Write habit here"
            value={habit.name}
            required
            onChange={(e) =>
              setHabit((prevHabit) => ({
                ...prevHabit,
                name: e.target.value,
              }))
            }
          />
        </div>
        <button className={Styles.btnSuccess} onClick={handleAddHabit}>
          Add
        </button>
        <NavLink to={"/"}>
          <button className={Styles.btnDanger}>Cancel</button>
        </NavLink>
      </div>
    </div>
  );
}
