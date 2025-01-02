// filepath: src/hooks/useFetchData.js
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs'

const useFetchData = () => {
  return useQuery({
    queryKey: ['blogs'], 
    queryFn: blogService.getBlogs
  });
};

export default useFetchData