fetch('https://jservice.io/api/clues')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });
function betterFetch(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    reject(new Error('Este es un error'));
                } else {
                    return response.json();
                }
            })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

betterFetch('https://jservice.io/api/clues')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });
