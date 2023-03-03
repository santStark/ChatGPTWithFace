var exemplo;
(function (exemplo) {
    class Comum {

        constructor() {

            //this.baseUrl = 'http://localhost:3000/';
            this.baseUrl = './';
            this.state = {};
            
        }

        myFetch(api, body) {
            return new Promise((resolve, reject) => {

                fetch(this.baseUrl + api, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                    .then((r) => r.json())
                    .then((data) => { resolve(data); })
                    .catch((e) => reject(e));
            });
        }
    }
    exemplo.comum = new Comum();
})(exemplo || (exemplo = {}));