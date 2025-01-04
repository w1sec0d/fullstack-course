import { useQuery } from '@tanstack/react-query'
import blogService from '../../services/blogs'
import { Link } from 'react-router-dom'

const UserlistPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogsPerUser,
  })

  if (isLoading) {
    return <p className="text-white">Loading Users info...</p>
  }
  if (isError) {
    return <p className="text-red-500">An error occurred! Try again later</p>
  }

  if (data) {
    return (
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <table className="min-w-full bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-700">
                Blogs Created
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              if (!row.userId) return
              return (
                <tr key={row.userId}>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <Link to={`/users/${row.userId}`} className="text-blue-400">
                      {row.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {row.blogs.length}
                  </td>
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
