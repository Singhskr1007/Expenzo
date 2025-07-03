import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname) {
      setError("Please Enter Your Name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter A Valid E-Mail Address");
      return;
    }

    if (!password) {
      setError("Please Enter The Password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        toast.success("Sign-Up Successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong. Please Try Again.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='w-full h-screen overflow-auto px-4 py-6 flex justify-center items-start'>
        <div className='w-full max-w-xl'>
          <h3 className='text-xl font-semibold text-black'>
            Create An Account
          </h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join Us Today By Entering Your Details Below.
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">

            {/* Profile Image */}
            <div className="flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>

            {/* Stacked inputs on mobile, 2-column grid on md+ */}
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">

              <Input
                value={fullname}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Enter Full Name"
                type="text"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter E-Mail Address"
                type="text"
              />

              {/* Full width password input */}
              <div className='md:col-span-2'>
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className='text-red-500 text-xs'>{error}</p>}

            {/* Sign Up Button */}
            <button type='submit' className='btn-primary w-full'>
              SIGN-UP
            </button>

            <p className='text-[13px] text-slate-800 text-center'>
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
