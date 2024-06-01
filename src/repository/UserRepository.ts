import api from "../utils/api"

const UserRepository = {
  index: async (): Promise<Pagination<User>> => {
    return (await api.get('/users')).data
  },
}

export default UserRepository
