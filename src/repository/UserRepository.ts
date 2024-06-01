import api from "../utils/api"

interface UserCreateParams {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface UserUpdateParams {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

const UserRepository = {
  index: async (): Promise<Pagination<User>> => {
    return (await api.get('/users')).data
  },
  create: async (payload: UserCreateParams): Promise<User> => {
    return (await api.post('/users', payload)).data
  },
  update: async (id: number, payload: UserUpdateParams): Promise<User> => {
    return (await api.put(`users/${id}`, payload)).data
  }
}

export default UserRepository
