import fetcher from "@/utils/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
type EmployeeData = {
  employeeId: string;
  employeeName: string;
  emailId: string;
  startDate: Date;
  designation: string;
  technology: string;
};

const validataionSchema = Yup.object({
  employeeId: Yup.string().required("employee Id is required"),
  employeeName: Yup.string().required("employee name Id is required"),
  emailId: Yup.string().required("email Id is required"),
  startDate: Yup.date().required("start Date is required"),
  designation: Yup.string().required("designation is required"),
  technology: Yup.string().required("technology is required"),
});
const AddEmployeeModal = () => {
  // const [value, setValue] = useState<Date | null>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<EmployeeData>({
    resolver: yupResolver(validataionSchema),
  });

  const onSubmit: SubmitHandler<EmployeeData> = async (data) => {
    const response = await fetcher("employee/add", "POST", data);
    console.log("data", response);
  };
  const startDate = watch("startDate");

  return (
    <>
      <div>
        {/* <h4>Add Employee</h4> */}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col md-6">
              <TextInput
                label="Employee Id"
                placeholder="Input placeholder"
                error={errors.employeeId?.message}
                {...register("employeeId")}
              />
            </div>
            <div className="col md-6">
              <TextInput
                label="Employee Name"
                placeholder="Input placeholder"
                error={errors.employeeName?.message}
                {...register("employeeName")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col md-6">
              <TextInput
                label="Email id"
                placeholder="Input placeholder"
                error={errors.emailId?.message}
                {...register("emailId")}
              />
            </div>
            <div className="col md-6">
              <DateInput
                label="Start Date"
                onChange={(value: any) => {
                  setValue("startDate", value);
                  clearErrors("startDate");
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col md-6">
              <TextInput
                label="Designation"
                placeholder="Input placeholder"
                error={errors.designation?.message}
                {...register("designation")}
              />
            </div>
            <div className="col md-6">
              <TextInput
                label="Technology"
                placeholder="Input placeholder"
                error={errors.technology?.message}
                {...register("technology")}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployeeModal;
