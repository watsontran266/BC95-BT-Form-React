import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addStudent,updateStudent,setEditingStudent } from "../store/studentSlice";

const FormInfo = () => {
  const editingStudent = useSelector((state) => state.student.editingStudent);
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();
  // yup schema
  const formSchema = Yup.object({
    id: Yup.string()
      .matches(/^[0-9]{6}$/, "mã sinh viên phải có 6 chữ số")
      .required("Mã SV là bắt buộc"),

    name: Yup.string()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .required("Tên là bắt buộc"),

    phone: Yup.string()
      .matches(/^0[0-9]{9}$/, "Số điện thoại phải có 10 chữ số và bắt đầu từ 0")
      .required("Số điện thoại là bắt buộc"),

    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

  // initialValue
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editingStudent || {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingStudent) {
        // Đang sửa → update
        dispatch(updateStudent(values));
        dispatch(setEditingStudent(null)); // 👈 reset lại để form trở về thêm mới
      } else {
        // Đang thêm mới → check trùng + add
        const isExist = students.some((sv) => sv.id === values.id);
        if (isExist) {
          alert("Mã sinh viên đã tồn tại!");
          return;
        }
        dispatch(addStudent(values));
      }
      resetForm();
    },
  });

  return (
    <div>
      <p className="bg-slate-800 text-white px-4 py-2 font-medium mb-5 rounded-md ">
        Thông tin sinh viên
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="ID"
              className="mb-2 text-slate-900 font-medium text-sm inline-block "
            >
              Mã SV
            </label>
            <input
              type="number"
              id="ID"
              {...formik.getFieldProps("id")}
              placeholder="123456"
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
            />
            {formik.touched.id && formik.errors.id && (
              <p className="text-base text-red-600 mt-1">{formik.errors.id}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="mb-2 text-slate-900 font-medium text-sm inline-block "
            >
              Họ Tên
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              placeholder="Nguyễn văn B"
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-base text-red-600 mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 text-slate-900 font-medium text-sm inline-block "
            >
              Số Điện Thoại
            </label>
            <input
              type="tel"
              id="phone"
              {...formik.getFieldProps("phone")}
              placeholder="09x-xxx-xxxx"
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-base text-red-600 mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 text-slate-900 font-medium text-sm inline-block "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="nguyenvanb@gmail.com"
              className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 "
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-base text-red-600 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md mb-5 transition-colors cursor-pointer"
        >
          Thêm sinh viên
        </button>
      </form>
    </div>
  );
};

export default FormInfo;
