"use client"

import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function page() {
    useEffect(() => {
        const testFetch = async () => {
            try {
                const test = await axios.post('http://localhost:4000/test', {}, { withCredentials: true })
                console.log("test", test)
            } catch (error) {
                console.log(error)

            }
        }

        testFetch()
    }, [])
    return (
        <div>page</div>
    )
}

export default page