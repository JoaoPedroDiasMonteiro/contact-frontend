import UserListing from '../components/User/UserListing'
import { PaginationResourceProvider } from '../context/PaginationResourceContext'

export default function HomePage() {
  return (
    <div>
      <PaginationResourceProvider endpoint='/users'>
        <UserListing />
      </PaginationResourceProvider>
    </div>
  )
}
