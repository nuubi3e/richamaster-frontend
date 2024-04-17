export const API_URL =
  'http://localhost:8001/http/https://api.trs.kharkiv.ua/api/v1'

export const connectToAPI = async (payload: {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT'
  body?: string | FormData
}) => {
  const url = payload.endpoint.includes('http')
    ? payload.endpoint
    : `${API_URL}/${payload.endpoint}/?csrftoken=${localStorage.getItem(
        'csrftoken'
      )}&sessionid=${localStorage.getItem('sessionid')}`

  console.log('BEFORE CALL: ', { url, body: payload.body })

  const res = await fetch(url, {
    method: payload.method,
    body: payload.body ? payload.body : undefined,
    headers:
      typeof payload.body === 'string'
        ? {
            'Content-Type': 'application/json',
          }
        : undefined,
  })

  console.log(res.headers.entries())
  console.log(res.headers.get('set-cookie'))

  if (!res.ok) {
    const text = JSON.parse(await res.text())

    console.log('IN ERR: ', text)
    throw new Error(text.message)
  }

  const data = await res.json()
  console.log('API RES: ', data)

  return data
}
