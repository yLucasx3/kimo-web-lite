import axios from 'axios';
import { parseCookies } from 'nookies';

const { REACT_APP_API_URL } = process.env;

export const enviroment = {
    api_production: 'https://kimo-api-lite.herokuapp.com',
};

export function getAPIClient(ctx = undefined) {
    const { 'kimochism.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: REACT_APP_API_URL || enviroment.api_production,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}

const get = async (url, pathParams = [], queries = null, context = null) => {
    const buildedUrl = buildUrl(url, pathParams, queries);

    console.log('buildedUrl: ', buildedUrl);

    const response = await getAPIClient(context).get(buildedUrl);
    return response.data;
};

const post = async (url, data, context = null) => {
    const buildedUrl = buildUrl(url);
    const response = await getAPIClient(context).post(buildedUrl, data);
    return response.data;
};

const put = async (url, data, pathParams = [], context = null) => {
    const buildedUrl = buildUrl(url, pathParams, null);
    const response = await getAPIClient(context).put(buildedUrl, data);
    return response.data;
};

const del = async (url, pathParams = [], context = null) => {
    const buildedUrl = buildUrl(url, pathParams, null, context);
    const response = await getAPIClient(context).delete(buildedUrl);
    return response.data;
};

const buildUrl = (url, pathParams, queries) => {
    const buildedPathParams = buildPathParams(url, pathParams);
    const buildedQueries = buildQueries(queries);
    const buildedUrl = `${buildedPathParams}${buildedQueries ? '?'.concat(buildedQueries) : ''}`;
    return buildedUrl;
};

const buildQueries = queries => {
    if (!queries) {
        return;
    }
    const keys = Object.keys(queries);
    return keys
        .map(key => {
            return `${key}=${queries[key]}`;
        })
        .join('&&');
};

const buildPathParams = (url, pathParams) => {
    if (!pathParams || !pathParams.length) {
        return url;
    }
    const regex = /\{(.*?)\}/;
    pathParams.forEach(value => {
        const matched = regex.exec(url);
        if (matched) {
            url = url.replace(matched[0], value);
        }
    });
    return url;
};

export { get, post, del, put };
