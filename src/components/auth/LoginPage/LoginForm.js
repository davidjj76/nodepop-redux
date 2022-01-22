import T from 'prop-types';

import { Form, Input, FormConsumer } from '../../form';

const validEmail = ({ email }) => email;
const validPassword = ({ password }) => password;

function LoginForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      initialValue={{
        email: '',
        password: '',
        remember: false,
      }}
    >
      <Input name="email" />
      <Input type="password" name="password" />
      <Input type="checkbox" name="remember" />
      <FormConsumer>
        {({ validate }) => (
          <button disabled={!validate(validEmail, validPassword)}>Login</button>
        )}
      </FormConsumer>
    </Form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
