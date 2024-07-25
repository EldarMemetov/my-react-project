import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trimValues from '../TrimValues/TrimValues';
import { nanoid } from 'nanoid';
import formRegistration from './Form.module.css';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 letters')
    .max(50, 'Maximum 50 letters')
    .required('Required'),
  age: Yup.number()
    .min(1, 'Minimum age is 1')
    .max(150, 'Maximum age is 150')
    .required('Required'),
  city: Yup.string()
    .min(3, 'Minimum 3 letters')
    .max(50, 'Maximum 50 letters')
    .required('Required'),
  info: Yup.string()
    .min(3, 'Minimum 3 letters')
    .max(300, 'Maximum 300 letters')
    .required('Required'),
  photo: Yup.string().url('Must be a valid URL').required('Required'),
  role: Yup.string().oneOf(['man', 'girl', 'next']).required('Required'),
  agree: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Required'),
});

const LoginForm = ({ onAdd }) => {
  const handleSubmit = (values, actions) => {
    try {
      const newPeople = { id: nanoid(), ...values };
      console.log(values);
      actions.resetForm();
      onAdd(trimValues(newPeople));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={formRegistration.formContainer}>
      <h2 className={formRegistration.formTitle}>Add New Contact</h2>
      <Formik
        initialValues={{
          name: '',
          age: '',
          city: '',
          info: '',
          photo:
            'https://img.freepik.com/free-photo/cute-cat-in-nature_23-2150932113.jpg',
          role: 'make a choice',
          agree: false,
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>Name</label>
              <Field type="text" name="name" className={formRegistration.formInput} />
              <ErrorMessage name="name" component="span" className={formRegistration.errorMessage} />
            </div>
            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>Age</label>
              <Field type="text" name="age" className={formRegistration.formInput} />
              <ErrorMessage name="age" component="span" className={formRegistration.errorMessage} />
            </div>
            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>City</label>
              <Field type="text" name="city" className={formRegistration.formInput} />
              <ErrorMessage name="city" component="span" className={formRegistration.errorMessage} />
            </div>
            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>Info</label>
              <Field as="textarea" name="info" className={formRegistration.formTextarea} />
              <ErrorMessage name="info" component="span" className={formRegistration.errorMessage} />
            </div>
            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>Images</label>
              <Field
                type="text"
                name="photo"
                placeholder="Image URL"
                value={values.photo}
                onChange={(e) => setFieldValue('photo', e.target.value)}
                className={formRegistration.formInput}
              />
              <ErrorMessage name="photo" component="span" className={formRegistration.errorMessage} />
            </div>

            <div className={formRegistration.formGroup}>
              <label className={formRegistration.formLabel}>Role:</label>
              <Field as="select" name="role" className={formRegistration.formSelect}>
                <option value="make a choice">make a choice</option>
                <option value="man">Man</option>
                <option value="girl">Girl</option>
                <option value="next">Next</option>
              </Field>
              <ErrorMessage name="role" component="span" className={formRegistration.errorMessage} />
            </div>
            <div className={`${formRegistration.formGroup} ${formRegistration.checkboxGroup}`}>
              <Field type="checkbox" name="agree" />
              <label className={formRegistration.checkboxLabel}>Agree</label>
              <ErrorMessage name="agree" component="span" className={formRegistration.errorMessage} />
            </div>
            <button type="submit" className={formRegistration.submitButton}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
