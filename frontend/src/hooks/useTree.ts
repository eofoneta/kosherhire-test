import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../libs/axios';

export type Node = {
  id: number;
  name: string;
  isDir: boolean;
  parentId?: number | null;
};

export const useTree = (parentId?: number) => {
  return useQuery<Node[]>({
    queryKey: ['tree', parentId ?? 'root'],
    queryFn: async () => {
      const res = await api.get('/tree/children', {
        params: parentId ? { parent_id: parentId } : {},
      });
      return res.data;
    },
  });
};

export const useAddNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Node, 'id'>) =>
      api.post('/tree/add', data).then(res => res.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tree', variables.parentId ?? 'root'],
      });
    },
  });
};
