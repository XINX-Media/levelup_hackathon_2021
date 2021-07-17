function getBaseUrl() {
    return 'http://localhost:8080';
}

export async function callApi(method, api, params = {}) {
    let url = `${getBaseUrl()}/api/${api}`;

    const options = {
        method,
        headers: {},
    };

    // for get
    if (method === 'GET' || method === "DELETE") {
        const paramsList = Object.keys(params).map((key) => {
            return `${key}=${encodeURIComponent(params[key])}`;
        });
        if (paramsList.length > 0) {
            const paramUrl = paramsList.join("&");
            url += "?" + paramUrl;
        }
    } else if (method === 'POST' || method === "PATCH") {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(params);
    }

    const response = await fetch(url,options);

    if (response.status !== 200) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
    }

    const json = await response.json();

    if (json.success) {
        return json;
    }

    throw Error(json.message);
}