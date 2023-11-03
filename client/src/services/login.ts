import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/login', {
            email,
            password,
        }, {
            withCredentials: true,
        });
        return {
            data: res.data,
            status: res.status,
        };
    } catch (err: any) {
        if (err.response) {
            return {
                data: err.response.data,
                status: err.response.status,
            };
        }

        return {
            data: {
                message: 'Something went wrong',
            },
            status: 500,
        };
    }
}