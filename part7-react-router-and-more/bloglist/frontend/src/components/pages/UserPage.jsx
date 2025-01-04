import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogs'

const UserPage = () => {
  const id = useParams().id
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getBlogsPerUser({ userId: id }),
  })

  if (isLoading) {
    return <p className="text-white">Loading User info...</p>
  }
  if (isError) {
    return <p className="text-red-500">An error occurred! Try again later</p>
  }

  if (data && isSuccess) {
    return (
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-4">Added blogs</h2>
        <ul className="list-disc list-inside">
          {data.map((blog) => {
            if (!blog.id) {
              return
            }
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default UserPage
