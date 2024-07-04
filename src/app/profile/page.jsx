"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"
import axios from "axios"
import Swal from 'sweetalert2';

function MyProfilePage() {

    const router = useRouter()
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getUserPosts = async () => {
            if(session) {
                const response = await axios.get(`/api/users/${session?.user.id}/posts`)
                setPosts(response.data.allPosts)
            }
            
        }
        getUserPosts()
    }, [session])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const result = await Swal.fire({
            title: 'Are you sure to DELETE this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Yes, DELETE it!'
          });
      
          if (result.isConfirmed) {
            await axios.delete(`/api/prompt/${post._id}`);
            const otherPosts = posts.filter((item) => item._id !== post._id);
            setPosts(otherPosts);
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            );
          }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to Your Personalised profile Page."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfilePage