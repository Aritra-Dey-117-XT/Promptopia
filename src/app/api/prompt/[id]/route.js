import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export async function GET( request, {params} ) {

    try {

        await connectToDB()
        
        try {
            const post = await Prompt.findById(params.id).populate("creator")
            return NextResponse.json({message: "Post Fetched Successfully!", post}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "Post Not Found!"}, {status: 404})
        }

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function PATCH( request, {params} ) {

    const reqBody = await request.json()
    const {editedPrompt, editedTags} = reqBody

    try {
        
        await connectToDB()
        const editPost = await Prompt.findById(params.id)

        if(!editPost) {
            return NextResponse.json({message: "Post Not Found!"}, {status: 404})
        }

        editPost.prompt = editedPrompt
        editPost.tags = editedTags.filter((item) => item !== "" && item !== " ").map((item) => item[0] !== "#" ? `#${item}` : item)

        await editPost.save()

        return NextResponse.json({message: "Post Edited Successfully!"}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE( request, {params} ) {

    try {
        
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return NextResponse.json({message: "Post Deleted Successfully!"}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}