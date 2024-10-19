import { Formik } from 'formik';

export default function AuthForm() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <Field type="email" name="email" placeholder="E-mail" />
        <Field type="password" name="password" placeholder="Password" />
        <Field
          type="password"
          name="repeatpassword"
          placeholder="Repeat password"
        />
        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  );
}

// export default function AuthForm() {
//   const handleSubmit = evt => {
//     evt.preventDefault();
//     const form = evt.target;
//     const { email, password, repeatpassword } = form.elements;
//     console.log(email.value, password.value, repeatpassword.value);
//     form.reset();
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Enter your email</label>
//         <input type="email" name="email" placeholder="E-mail" />
//       </div>
//       <div>
//         <label htmlFor="password">Enter your password</label>
//         <input type="password" name="password" placeholder="Password" />
//       </div>
//       <div>
//         <label htmlFor="repeatpassword">Repeat password</label>
//         <input
//           type="password"
//           name="repeatpassword"
//           placeholder="Repeat password"
//         />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }
