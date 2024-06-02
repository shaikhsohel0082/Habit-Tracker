import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    deleteHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id === action.payload
      );
      if (index !== -1) {
        state.habits.splice(index, 1);
      }
    },
    increaseCount: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id == action.payload
      );
      if (index !== -1 && state.habits[index].count < 7) {
        state.habits[index].count += 1;
      }
    },
    decreaseCount: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id == action.payload
      );
      if (index !== -1 && state.habits[index].count > 0) {
        state.habits[index].count -= 1;
      }
    },
    setYesClicked: (state, action) => {
      const { id, day } = action.payload;
      const index = state.habits.findIndex((habit) => habit.id == id);
      const alredyExists = state.habits[index].yesClicked.includes(day);
      if (index != -1 && !alredyExists) {
        state.habits[index].yesClicked.push(day);
      }
    },
    setNoClicked: (state, action) => {
      const { id, day } = action.payload;
      const index = state.habits.findIndex((habit) => habit.id == id);
      const dayIndex = state.habits[index].yesClicked.findIndex(
        (d) => d == day
      );
      if (index != -1 && dayIndex != -1) {
        state.habits[index].yesClicked.splice(dayIndex, 1);
      }
    },
  },
});

export const habitReducer = habitSlice.reducer;
export const addHabit = habitSlice.actions.addHabit;
export const deleteHabit = habitSlice.actions.deleteHabit;
export const increaseCount = habitSlice.actions.increaseCount;
export const decreaseCount = habitSlice.actions.decreaseCount;
export const setYesClicked = habitSlice.actions.setYesClicked;
export const setNoClicked = habitSlice.actions.setNoClicked;
export const Habits = (state) => state.habitReducer.habits;
