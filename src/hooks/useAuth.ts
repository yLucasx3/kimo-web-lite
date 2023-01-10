import { useState, useEffect } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import api from 'api';
import ApiClient from 'config/api';
import { useRouter } from 'next/router';

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);

        const {
            'kimochism.token': token,
            'kimochism.customer.firstName': firstName,
            'kimochism.user.email': email,
        } = parseCookies();

        if (token) setIsAuthenticated(true);
        if (firstName) setFirstName(firstName);
        if (email) setEmail(email);

        setLoading(false);
    }, []);

    const handleLogin = async (email, password) => {
        const maxAge = 60 * 60 * 1; // 1 hour

        const setCookies = cookies => {
            cookies.map(cookie => {
                setCookie(undefined, cookie.name, cookie.value, { maxAge });
            });
        };

        return await api.users
            .auth({ email, password })
            .then(async response => {
                ApiClient.defaults.headers['Authorization'] = `Bearer ${response.access_token}`;

                const { _id: id, email_verified: emailVerified } = response.user;

                if (emailVerified) {
                    setCookie(undefined, 'kimochism.user.emailVerified', emailVerified, { maxAge });
                }

                const customer = await api.customers.showByUser(id);

                const firstName = customer.full_name.split(' ')[0];

                const cookies = [
                    {
                        name: 'kimochism.token',
                        value: response.access_token,
                    },
                    {
                        name: 'kimochism.user.email',
                        value: email,
                    },
                    {
                        name: 'kimochism.customer.firstName',
                        value: firstName,
                    },
                    {
                        name: 'kimochism.user.id',
                        value: id,
                    },
                    {
                        name: 'kimochism.customer.id',
                        value: customer._id,
                    },
                ];

                setCookies(cookies);
                setEmail(email);
                setIsAuthenticated(true);

                if (!emailVerified) {
                    return router.push('/email/confirm');
                }

                return { success: true, message: 'success' };
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    return {
                        success: false,
                        message: 'Email e/ou senha inválido',
                    };
                }

                return {
                    success: false,
                    message: 'Serviço indisponível, entre em contato com o suporte.',
                };
            });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);

        const cookiesToDestroy = Object.keys(parseCookies())
            .map(cookie => cookie)
            .filter(cookie => cookie.includes('kimochism'));

        destroyCookeis(cookiesToDestroy);
    };

    const destroyCookeis = cookies => {
        cookies.map(cookie => {
            destroyCookie(undefined, cookie, {});
        });
    };

    return {
        isAuthenticated,
        loading,
        firstName,
        email,
        handleLogin,
        handleLogout
    };
}
