
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
        .catch(error => console.log(error))
    }
    // запрос - поиск продуктов на сервере, вместо функции handleRequest
    getSearch(query) {
        return fetch (`${this._baseUrl}/products/search?query=${query}`, {
            headers: this._headers
        }).then(responseFromFetch)
        .catch(error => console.log(error))
    }
    // запрос на установку/снятие лайка товара
    changeLike (_id, isLike) {
        return fetch (`${this._baseUrl}/products/likes/${_id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
            }).then(responseFromFetch)
            .catch(error => console.log(error))
    }
    //запрос на поиск продукта по Id
    getProductById (productId) {
        return fetch (`${this._baseUrl}/products/${productId}`, {
            headers: this._headers
        }).then(responseFromFetch)
        .catch(error => console.log(error))
    }

    // запрос получения информации о пользователе
    getUserInfo () {
        return fetch (`${this._baseUrl}/v2/group-7/users/me`, {
            headers: this._headers
        }).then(responseFromFetch)
        .catch(error => console.log(error))
    }
    // запрос установки данных пользователя
    setUserInfo (updateUserInfo) {
        return fetch (`${this._baseUrl}/v2/group-7/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(updateUserInfo)
        }).then(responseFromFetch)
        .catch(error => console.log(error))
    }
    // ожидание выполнения нескольких запросов
    waitAllInfo() {
        return Promise.all([this.getProductList(), this.getUserInfo()])
    }

    // запрос отправки отзыва от пользователя
    sendReview (productId, review) {
        return fetch (`${this._baseUrl}/products/review/${productId}`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(review)
        }).then(responseFromFetch)
        .catch(error => console.log(error))
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
