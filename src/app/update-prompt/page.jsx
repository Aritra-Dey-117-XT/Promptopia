"use client"

import Form from "@/components/Form";
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios"

function EditPrompt() {

    const router = useRouter()
    const postId = useSearchParams().get("id")

    const [post, setPost] = useState({
      prompt: "",
      tags: []
    })
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
      const getPost = async () => {
        try {
            const response = await axios.get(`/api/prompt/${postId}`)
            console.log(response.status)
            setPost(response.data.post)
        } catch (error) {
            router.push("/error")
        }
        
      }
      getPost()
    }, [])

    const editPrompt = async (event) => {

        event.preventDefault()
        setSubmitting(true)
        
        try {
            const response = await axios.patch(`/api/prompt/${postId}`, {
                editedPrompt: post.prompt,
                editedTags: post.tags
            })

            if(response.status === 200) {
                router.push("/profile")    
            }
        
        } catch (error) {
            console.log("error: ", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}

export default EditPrompt