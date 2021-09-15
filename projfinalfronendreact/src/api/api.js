export const Api = {
    url: 'http://localhost:3001/tasks',
    fetchGet: () => fetch(Api.url),
    fetchGetById: (id) => fetch(Api.url + '/findById/' + id),
    fetchPost: (body) => {
        return fetch(Api.url + '/add', {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/json"
            }),
            body: JSON.stringify(body)
        })
    },
    fetchPut: (body, id) => {
        return fetch(Api.url + '/update/' + id, {
            method: 'PUT',
            headers: new Headers({
                "Content-type": "application/json"
            }),
            body: JSON.stringify(body)
        })
    },
    fetchDelete: (id) => {
        return fetch(Api.url + '/delete/' + id, {
          method: 'DELETE'
        })
      }
    }