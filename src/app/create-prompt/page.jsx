"use client"

import Form from "@/components/Form";
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios"

function CreatePrompt() {

    const { data: session } = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tags: ""
    })

    const createPrompt = async (event) => {

        event.preventDefault()
        setSubmitting(true)
        
        try {
            const response = await axios.post("/api/prompt/new", {
                userID: session?.user.id,
                prompt: post.prompt,
                tags: post.tags.split(" ")
            })

            if(response.status == 200) {
                router.push("/")
            }
        
        } catch (error) {
            console.log("error: ", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt