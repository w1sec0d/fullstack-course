import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogs'

const UserPage = () => {
  const id = useParams().id
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getBlogsPerUser({ userId: id }),
  })

  if (isLoading) {
    return <p>Loading User info...</p>
  }
  if (isError) {
    return <p>An error ocurred! try again later</p>
  }

  if (data) {
    return (
      <>
        <h2>Added blogs</h2>
        <ul>
          {data.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default UserPage
