import { Button, Card, Input, TextInput } from "@mantine/core";
import React from "react";
import scss from "./login.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
type LoginData = {
  employeeID: string;
};

const validationSchema = Yup.object({
  employeeID: Yup.string().required("employeeID is required"),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div className={scss.super_div}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div className={scss.main_div}>
            <h2 className={scss.heading}>Employer Login</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className={scss.input_wrapper}>
                <TextInput
                  label="Employee Id"
                  placeholder="Enter employee Id"
                  {...register("employeeID")}
                  error={errors.employeeID?.message}
                />
              </div>
              <div className={scss.button_wrapper}>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
