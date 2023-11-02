import axios from 'axios';

export const registerUser = async (name: string, surname: string, email: string, password: string) => {
    try {
        const res = await axios.post('http://localhost:4000/auth/register', {
            name,
            surname,
            email,
            password,
        });
        return {
            success: true,
            data: res.data,
        }
    } catch (err: any) {
        if (err.response) {
            return {
                success: false,
                data: err.response.data,
            }
        }

        return {
            success: false,
            data: err.message,
        }
    }
}