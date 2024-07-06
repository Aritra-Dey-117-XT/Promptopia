import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        
        await connectToDB()

        const allPrompts = await Prompt.find({creator: userId}).populate("creator")

        return NextResponse.json({message: "All Prompts Fetched!", allPrompts}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}