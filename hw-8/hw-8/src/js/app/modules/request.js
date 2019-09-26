function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function() {
            //  console.log(xhr.status)
            if (xhr.readyState === 4) {

                if (xhr.status !== 200) {
                    this.isError = true;
                    console.log(this.isError)
                    reject(xhr.status);
                } else {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                }

            }
        };
        xhr.onerror = function(e) {
            reject(e);
        };
        xhr.open('GET', url);
        xhr.send();
    });
}

function makePOSTRequest(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status !== 200) reject(response);
                resolve(response);
            }
        };

        xhr.onerror = function(e) {
            reject(e);
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        xhr.send(JSON.stringify(data));
    });
}

export default {
    makeGETRequest,
    makePOSTRequest
}