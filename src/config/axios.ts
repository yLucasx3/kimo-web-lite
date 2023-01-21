import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

const { REACT_APP_API_URL } = process.env;

export const enviroment = {
    api_production: 'http://localhost:3333',
};

export function getAPIClient(ctx?: any): AxiosInstance {
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

const get = async (url: string, pathParams = [], queries = null, context?: any) => {
    const buildedUrl = buildUrl(url, pathParams, queries);

    const response = await getAPIClient(context).get(buildedUrl);
    return response.data;
};

const post = async (url: string, data: any, context?: any) => {
    const buildedUrl = buildUrl(url);
    const response = await getAPIClient(context).post(buildedUrl, data);
    return response.data;
};

const put = async (url: string, data: any, pathParams = [], context?: any) => {
    const buildedUrl = buildUrl(url, pathParams, null);
    const response = await getAPIClient(context).put(buildedUrl, data);
    return response.data;
};

const del = async (url: string, pathParams = [], context = null) => {
    const buildedUrl = buildUrl(url, pathParams, null, context);
    const response = await getAPIClient(context).delete(buildedUrl);
    return response.data;
};

const buildUrl = (url: string, pathParams?: string[], queries?: any, context?: any) => {
    const buildedPathParams = buildPathParams(url, pathParams);
    const buildedQueries = buildQueries(queries);
    const buildedUrl = `${buildedPathParams}${buildedQueries ? '?'.concat(buildedQueries) : ''}`;
    return buildedUrl;
};

const buildQueries = (queries: any) => {
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

const buildPathParams = (url: string, pathParams: string[]) => {
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
