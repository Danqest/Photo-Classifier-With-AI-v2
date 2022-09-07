// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import Auth from '../utils/auth';
// import { ADD_USER } from '../utils/mutations';

// function Signup(props) {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [addUser] = useMutation(ADD_USER);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const mutationResponse = await addUser({
//       variables: {
//         email: formState.email,
//         password: formState.password,
//         firstName: formState.firstName,
//         lastName: formState.lastName,
//       },
//     });
//     const token = mutationResponse.data.addUser.token;
//     Auth.login(token);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   return (
//     <form onSubmit={habdleFormSubmit}>
//         <h3>Sign Up</h3>
//         <div className="mb-3">
//           <label>First name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="First name"
//             id='firstName'
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Last name</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             placeholder="Last name"
//             id='lastName'
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             id='email'
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             id='pwd'
//             onChange={handleChange}
//           />
//         </div>
//         <div className="d-grid">
//           <button type="submit" className="btn btn-primary">
//             Sign Up
//           </button>
//         </div>
//         <p className="forgot-password text-right">
//           Already registered <a href="/Login">Login?</a>
//         </p>
//       </form>
//   );
// }

// export default Signup;
