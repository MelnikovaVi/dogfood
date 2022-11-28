
class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    // запрос списка продуктов
    getProductList () {
        return fetch (`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(responseFromFetch)
    }
    // запрос - поиск продуктов на сервере, вместо функции handleRequest
    getSearch(query) {
        return fetch (`${this._baseUrl}/products/search?query=${query}`, {
            headers: this._headers
        }).then(responseFromFetch)
    }
    // запрос на установку/снятие лайка товара
    changeLike (_id, myLike) {
        return fetch (`${this._baseUrl}/products/likes/${_id}`, {
            method: myLike ? "DELETE" : "PUT",
            headers: this._headers
            }).then(responseFromFetch)
    }
    


    // запрос получения информации о пользователе
    getUserInfo () {
        return fetch (`${this._baseUrl}/v2/group-7/users/me`, {
            headers: this._headers
        }).then(responseFromFetch)
    }
    // запрос установки данных пользователя
    setUserInfo (updateUserInfo) {
        return fetch (`${this._baseUrl}/v2/group-7/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(updateUserInfo)
        }).then(responseFromFetch)
    }
    // ожидание выполнения нескольких запросов
    waitAllInfo() {
        return Promise.all([this.getProductList(), this.getUserInfo()])
    }
    

}

const responseFromFetch = (res) => {
    return res.ok? res.json(): Promise.reject(`Ошибка подключения: ${res.status}`)
}


const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type' : 'application/json',
        Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDUiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDcsImV4cCI6MTY5OTQ0Nzk0N30.kiWSA1FAff5FLnick0omVMZ6Oz4kNAk8kH6Kc48JZrw'
    }
}

const api = new Api(config);
export default api;
