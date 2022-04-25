import axios from 'axios'

export const ENDPOINTS = {
  POSTS: 'get-all-posts',
  POST: 'get-post-by-id',
  ADD_POST: 'create-post',
  UPDATE_POST: 'update-post',
  REMOVE_POST: 'remove-post',
}

export const createAPIEndpoint = (endpoint) => {
  let url = `/${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
  }

  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url, { params: { id } }),
    create: (data) => axios.post(url, data, { headers }),
    update: (data) => axios.put(url, data, { headers }),
    delete: (id) => axios.delete(`${url}/${id}/`),
  }
}
