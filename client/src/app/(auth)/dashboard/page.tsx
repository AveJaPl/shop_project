"use client";

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: number
    username: string
    email: string
}

function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await axios.post('http://localhost:4000/user/data', {}, { withCredentials: true })
                setUser(user.data)
            } catch (error) {
                console.log(error)
                router.push('/login')

            }
        }

        fetchUser()
    }, [router])
    return (
        <>
            {user && (
                <>
                    <h1>Dashboard</h1>
                    <h2>Welcome {user?.username}</h2>
                </>
            )}
        </>
    )

}

export default Dashboard