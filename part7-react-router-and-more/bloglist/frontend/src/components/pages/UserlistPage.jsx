import { useQuery } from '@tanstack/react-query'
import blogService from '../../services/blogs'
import { Link } from 'react-router-dom'

const UserlistPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogsPerUser,
  })

  if (isLoading) {
    return <p>Loading Users info...</p>
  }
  if (isError) {
    return <p>An error ocurred! try again later</p>
  }

  if (data) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              if (!row.userId) return
              return (
                <tr key={row.userId}>
                  <td>
                    <Link to={`/users/${row.userId}`}>{row.name} </Link>
                  </td>
                  <td>{row.blogs.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UserlistPage
