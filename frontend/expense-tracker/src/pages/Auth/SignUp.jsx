import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  // Handle SignUp Form Submit
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

    if(!password) {
      setError("Please Enter The Password");
      return;
    }

    setError("");
  
    // SignUp API Call 

    try 
    {

      // Upload Image if present
      if (profilePic)
      {
          const imageUploadRes = await uploadImage(profilePic);
          profileImageUrl = imageUploadRes.imageUrl || "";
      }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
          fullname,
          email,
          password,
          profileImageUrl
        }); 

        const { token, user } = response.data;

        if(token)
        {
            localStorage.setItem('token', token);

            updateUser(user);

            toast.success("Sign-Up Successful!");

            setTimeout(() => {
                  navigate("/dashboard");
                }, 500);
        }

    } 
    
    catch(error) 
    {
        if(error.response && error.response.data.message)
        {
            setError(error.response.data.message);
        }
        else
        { 
            setError("Something Went Wrong. Please Try Again.");
        }
    }
  }


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          Create An Account
        </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join Us Today By Entering Your Details Below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

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

            <div className='col-span-2'>

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter Password"     // Min 8 characters
                type="password"
              />

            </div>


          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button
            type='submit' className='btn-primary'>
            SIGN-UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default SignUp
