import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  // handle inputs change
  function handleChange(e) {
    setInputs((inputs) => {
      return { ...inputs, [e.target.name]: e.target.value };
    });
  }

  // handle check box
  function handleChekboxChange(gender) {
    setInputs({ ...inputs, gender });
  }

  // submit to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    // console.log("submitted", inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-cyan-600">
          Sign Up
          {/* <span className="text-blue-500"> to your account</span> */}
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="fullName" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter FullName"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="username" className="label p-2">
              <span className="text-base label-text">UserName</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter UserName"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="confirmpassword" className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Enter Password Again"
              className="w-full input input-bordered h-10"
              value={inputs.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <GenderCheckBox
            onCheckBoxChange={handleChekboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            className="link link-primary mt-3 inline-block text-sm hover:underline"
          >
            Already have an account?
          </Link>
          <div className="">
            <button className="btn btn-block btn-sm mt-3" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

// STARTER  CODE
// import React from "react";
// import GenderCheckBox from "./GenderCheckBox";

// function SignUp() {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-cyan-600">
//           Sign Up
//           {/* <span className="text-blue-500"> to your account</span> */}
//         </h1>
//         <form action="">
//           <div className="">
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               type="text"
//               name=""
//               id=""
//               placeholder="Enter FullName"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div className="">
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">UserName</span>
//             </label>
//             <input
//               type="text"
//               name=""
//               id=""
//               placeholder="Enter UserName"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div className="">
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="text"
//               name=""
//               id=""
//               placeholder="Enter Password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div className="">
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               type="text"
//               name=""
//               id=""
//               placeholder="Enter Password Again"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <GenderCheckBox />
//           <a className="link link-primary mt-3 inline-block text-sm hover:underline">
//             Already have an account?
//           </a>
//           <div className="">
//             <button className="btn btn-block btn-sm mt-3">Sign Up</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
