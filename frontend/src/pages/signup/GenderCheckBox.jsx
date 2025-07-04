function GenderCheckBox({ onCheckBoxChange, selectedGender }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          htmlFor="male"
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="male"
            id="male"
            className="checkbox  border-slate-900"
            checked={selectedGender === "Male"}
            onChange={() => onCheckBoxChange("Male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor="female"
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "Female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            name="female"
            id="female"
            className="checkbox  border-slate-900"
            checked={selectedGender === "Female"}
            onChange={() => onCheckBoxChange("Female")}
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckBox;

//STARTER CODE FOR GENDER CHECKBOX
// import React from "react";

// function GenderCheckBox() {
//   return (
//     <div className="flex">
//       <div className="form-control">
//         <label htmlFor="" className={`label gap-2 cursor-pointer`}>
//           <span className="label-text">Male</span>
//           <input
//             type="checkbox"
//             name=""
//             id=""
//             className="checkbox  border-slate-900"
//           />
//         </label>
//       </div>
//       <div className="form-control">
//         <label htmlFor="" className={`label gap-2 cursor-pointer`}>
//           <span className="label-text">Female</span>
//           <input
//             type="checkbox"
//             name=""
//             id=""
//             className="checkbox  border-slate-900"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default GenderCheckBox;
