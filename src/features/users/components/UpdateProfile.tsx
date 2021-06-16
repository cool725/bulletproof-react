import { PencilIcon } from '@heroicons/react/solid';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { FormDrawer } from '@/components/Form/FormDrawer';
import { TextAreaField } from '@/components/Form/TextareaField';
import { useAuth } from '@/lib/auth';

import { useUpdateProfile } from '../hooks/useUpdateProfile';

type ProfileValues = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
};

export const UpdateProfile = () => {
  const { user, refetch } = useAuth();
  const updateProfileMutation = useUpdateProfile({
    config: {
      onSuccess: () => refetch({ cancelRefetch: false, throwOnError: false }),
    },
  });

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          disabled={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<ProfileValues>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.lastName,
            bio: user?.bio,
          },
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <TextAreaField
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
