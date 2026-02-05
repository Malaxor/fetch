import axios from 'axios'

const baseURL = 'https://frontend-take-home-service.fetch.com'
const config = { withCredentials: true }

async function axiosLogIn (payload) {
  await axios.post(`${baseURL}/auth/login`, payload, config)
}

async function axiosLogOut () {
  await axios.post(`${baseURL}/auth/logout`, {}, config)
} 

async function fetchSearchData (searchParams) { 
  const { data: searchData } = await axios.get(`${baseURL}/dogs/search`, { ...config, params: searchParams })
  const nextSearchData = await fetchNextSearchData(searchData.next)

  return {
    ...searchData,
    next: nextSearchData.resultIds.length ? searchData.next : ''
  }
}

async function fetchSearchQuery (searchQuery) { 
  const { data: searchData } = await axios.get(`${baseURL}${searchQuery}`, config)
  const nextSearchData = await fetchNextSearchData(searchData.next)
  
  return {
    ...searchData,
    next: nextSearchData.resultIds.length ? searchData.next : ''
  }
}

async function fetchNextSearchData (next) {
  const { data } = await axios.get(`${baseURL}${next}`, config)
  return data 
}

async function fetchDogs (resultIds) {
  const { data } = await axios.post(`${baseURL}/dogs`, resultIds, config)
  return data
}

async function fetchMachedDogId (payload) {
  const { data: { match: matchedDogId } } = await axios.post(`${baseURL}/dogs/match`, payload, config)
  return matchedDogId
}


export {
  axiosLogIn,
  axiosLogOut,
  fetchSearchData,
  fetchSearchQuery,
  fetchDogs,
  fetchMachedDogId
}
