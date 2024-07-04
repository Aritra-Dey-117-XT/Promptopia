import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server"

export async function POST(request) {

    const reqBody = await request.json()
    const {userID, prompt, tags} = reqBody

    try {
        
        await connectToDB()

        const allTags = tags.filter((item) => item !== "" || item !== " ").map((item) => item[0] !== "#" ? `#${item}` : item)

        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tags: allTags
        })

        await newPrompt.save()

        return NextResponse.json({message: "Prompt Successfully Posted!", newPrompt}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}