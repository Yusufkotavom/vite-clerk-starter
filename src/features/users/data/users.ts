import usersData from './users.json'

export const users = usersData.map((user) => ({
  ...user,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
}))
