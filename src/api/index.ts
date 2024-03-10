import { Wretch } from 'wretch/bundle/types';

export async function getConfigOfuser(api: Wretch) {
    return api.get('/editor').json();
}

export async function getVerifyToken(api: Wretch, token: string) {
    return api.get(`/verify?$token=${token}`).json();
}

export async function postConfigUser(api: Wretch, data: unknown) {
    return api.post('/editor');
}
