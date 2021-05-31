import { Link, useNavigate } from 'react-router-dom';

import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

type LoginValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form<LoginValues>
            onSubmit={async (values) => {
              await login(values);
              navigate('/');
            }}
          >
            {({ register }) => (
              <>
                <InputField
                  name="email"
                  type="email"
                  label="Email Address"
                  registration={register('email')}
                />
                <InputField
                  name="password"
                  type="password"
                  label="Password"
                  registration={register('password')}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Log in
                  </button>
                </div>
              </>
            )}
          </Form>
          <div className="mt-2 flex items-center justify-end">
            <div className="text-sm">
              <Link to="../register" className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
