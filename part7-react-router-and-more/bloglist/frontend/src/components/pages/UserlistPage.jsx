import { useQuery } from '@tanstack/react-query'
import blogService from '../../services/blogs'

const UserlistPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogsPerUser,
  })

  if (isLoading) {
    return <p>Loading User info...</p>
  }
  if (isError) {
    return <p>An error ocurred! try again later</p>
  }

  console.log({ data })

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
            return (
              <tr key={row.userId}>
                <td>{row.name}</td>
                <td>{row.blogs}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserlistPage
