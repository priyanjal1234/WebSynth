import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import registerSchema from "../schemas/registerSchema";
import userService from "../services/User";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let result = registerSchema.safeParse(formData);

      if (result.success) {
        await userService.register(formData);
        setIsLoading(false);
        toast.success("Registration Successfull");
        dispatch(setLoggedin(true));
        navigate("/building");
      } else {
        setIsLoading(false);
        setErrors(result.error.flatten().fieldErrors);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="And start building amazing websites with AI"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        <Input
          label="Full name"
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter Full Name"
        />

        <Input
          label="Email address"
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter Email"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter Password"
        />

        <Checkbox
          id="agree-terms"
          name="agreeToTerms"
          label={
            <span>
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
            </span>
          }
          checked={formData.agreeToTerms}
          onChange={handleChange}
          error={errors.agreeToTerms}
        />

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="transition-transform duration-200 active:scale-95"
          >
            Create account
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="relative flex justify-center text-sm">
            <span className="px-2  text-gray-300">
              Already have an account?
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/login">
            <Button
              variant="outline"
              fullWidth
              className="transition-transform duration-200 active:scale-95"
            >
              Sign in instead
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
