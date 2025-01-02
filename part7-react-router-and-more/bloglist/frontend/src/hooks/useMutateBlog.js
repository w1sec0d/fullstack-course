import { useMutation, useQueryClient } from '@tanstack/react-query';

const useMutateBlog = (mutationFunction, queryKey = ['blogs']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFunction, 
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useMutateBlog;