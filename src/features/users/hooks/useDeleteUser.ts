import { useMutation } from 'react-query';

import { MutationConfig, queryClient } from '@/lib/react-query';

import { deleteUser } from '../api';
import { User } from '../types';

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData<User[]>('users');

      queryClient.setQueryData(
        'users',
        previousUsers?.filter((discussion) => discussion.id !== deletedUser.userId)
      );

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('users');
    },
    ...config,
    mutationFn: deleteUser,
  });
};
