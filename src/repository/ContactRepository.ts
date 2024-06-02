import api from "../utils/api"

interface ContactCreateParams {
  type: 'whatsapp' | 'email' | 'phone',
  value: string
}

interface ContactUpdateParams {
  type?: 'whatsapp' | 'email' | 'phone',
  value?: string
}

const ContactRepository = {
  index: async (userId: number, options: ResourceIndexOptions = {}): Promise<Pagination<Contact>> => {
    return (await api.get(`/users/${userId}/contacts`, { params: options })).data
  },
  show: async (userId: number, id: number): Promise<Contact> => {
    return (await api.get(`/users/${userId}/contacts/${id}`)).data
  },
  create: async (userId: number, payload: ContactCreateParams): Promise<Contact> => {
    return (await api.post(`/users/${userId}/contacts`, payload)).data
  },
  update: async (userId: number, id: number, payload: ContactUpdateParams): Promise<Contact> => {
    return (await api.put(`/users/${userId}/contacts/${id}`, payload)).data
  },
  delete: async (userId: number, id: number): Promise<null> => {
    return (await api.delete(`/users/${userId}/contacts/${id}`)).data
  }
}

export const ContactTypes = [
  { id: 'whatsapp', type: 'Whatsapp' },
  { id: 'email', type: 'Email' },
  { id: 'phone', type: 'Phone' },
]

export default ContactRepository
