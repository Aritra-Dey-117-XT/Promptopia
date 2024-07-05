import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        
        await connectToDB()

        const allPrompts = await Prompt.find({}).populate("creator")

        return NextResponse.json({message: "All Prompts Fetched!", allPrompts: allPrompts}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}