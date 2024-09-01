import { Link } from 'wouter'
import { trpc } from '../../../infra/trpc'
import { Layout } from '../../Layout'

export const PeopleList: React.FC = () => {
  const peopleQuery = trpc.person.personList.useQuery()

  return (
    <Layout>
      <div className="">
        <div className="flex justify-end">
          <Link href="/people/new" className="da-btn da-btn-primary">
            Create
          </Link>
        </div>
        <div className="">
          <table className="da-table da-table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Gender</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {peopleQuery.data?.map((person) => (
                <tr key={person.id}>
                  <td>
                    <code>{person.id}</code>
                  </td>
                  <td>{person.nickname}</td>
                  <td>{person.gender}</td>
                  <td>
                    <Link
                      className="da-btn da-btn-xs"
                      href={`/people/${person.id}/edit`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
