import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-cyan-600">
          Login
          <span className="text-blue-500"> to your account</span>
        </h1>
        <form onSubmit={handleSubmit}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="link link-primary mt-3 inline-block text-sm hover:underline"
          >
            {"Don't"} have an account?
          </Link>
          <div className="">
            <button className="btn btn-block btn-sm mt-3" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

// function Login() {
//     return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//           <h1 className="text-3xl font-semibold text-center text-cyan-600">
//             Login
//             <span className="text-blue-500"> to your account</span>
//           </h1>
//           <form action="">
//             <div className="">
//               <label htmlFor="" className="label p-2">
//                 <span className="text-base label-text">UserName</span>
//               </label>
//               <input
//                 type="text"
//                 name=""
//                 id=""
//                 placeholder="Enter UserName"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>

//             <div className="">
//               <label htmlFor="" className="label p-2">
//                 <span className="text-base label-text">Password</span>
//               </label>
//               <input
//                 type="text"
//                 name=""
//                 id=""
//                 placeholder="Enter Password"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>
//             <a className="link link-primary mt-3 inline-block text-sm hover:underline">
//               {"Don't"} have an account?
//             </a>
//             <div className="">
//               <button className="btn btn-block btn-sm mt-3">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
