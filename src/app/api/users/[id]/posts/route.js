import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server"

export async function GET( request, {params} ) {

    const userId = params.id

    try {
        
        await connectToDB()

        try {
            const allPosts = await Prompt.find({ creator: userId }).populate("creator")
            return NextResponse.json({message: "User Posts Fetched Successfully!", allPosts}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "No Users Found!"}, {status: 404})
        }
        

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}