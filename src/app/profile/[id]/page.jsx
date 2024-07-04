"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"
import axios from "axios"

function UserProfilePage({params}) {

    const router = useRouter()
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(session?.user.id == params.id) {
            router.push("/profile")
        }
        const getUserPosts = async () => {
            if(session) {
                try {
                    const response = await axios.get(`/api/users/${params.id}/posts`)
                    setPosts(response.data.allPosts)
                } catch (error) {
                    router.push("/error")
                }
                
            }
            
        }
        getUserPosts()
    }, [session])

    return (
        <Profile
            name="My"
            desc="Welcome to My Personalised profile Page."
            data={posts}
            handleEdit={() => {}}
            handleDelete={() => {}}
        />
    )
}

export default UserProfilePage