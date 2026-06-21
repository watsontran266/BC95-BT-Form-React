import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    {
      id: "123456",
      name: "Nguyễn Văn A",
      phone: "0938111111",
      email: "nguyenvana@gmail.com",
    },
    {
      id: "234567",
      name: "Trần Thị B",
      phone: "0938222222",
      email: "tranthib@gmail.com",
    },
    {
      id: "345678",
      name: "Lê Văn C",
      phone: "0938333333",
      email: "levanc@gmail.com",
    },
  ],
  searchKeyword: "",
  editingStudent: null,
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (sv) => sv.id === action.payload.id,
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload,
      );
    },
    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
  setSearchKeyword,
} = studentSlice.actions;

export default studentSlice.reducer;
