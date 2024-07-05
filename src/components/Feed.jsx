"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import PromptCard from "./PromptCard"

function Feed({tag}) {

    const PromptCardList = ({ data }) => {
        return (
            <div className='mt-16 prompt_layout'>
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={(arg) => setSearchText(arg)}
                    />
                ))}
            </div>
        )
    }

    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchResultPosts, setSearchResultPosts] = useState([])

    const handleSearchChange = async(event) => {
        setSearchText(event.target.value)
    }


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get("/api/prompt", { headers: { 'Cache-Control': 'no-cache' } })
            const allPosts = response.data.allPrompts
            console.log("allPosts: ", allPosts)
            setPosts(allPosts)
        }
        fetchPosts()
    }, [])


    useEffect(() => {
        if (posts.length > 0 && tag) {
            setSearchText(`#${tag}`)
        }
    }, [posts, tag])


    useEffect(() => {

        const searchPosts = () => {
            if(searchText && searchText !== "") {
                let searchInput= searchText[0] == "#" ? searchText.slice(1).toLowerCase().split(" ").join("") : searchText.toLowerCase().split(" ").join("")
                const searchTagResults = posts.filter((item) => item.tags.map((item) => item[0] !== "#" ? `#${item.toLowerCase()}` : item.toLowerCase()).includes(`#${searchInput}`))
                const searchUserResults = posts.filter((item) => item.creator.username.toLowerCase() === searchText.toLowerCase().split(" ").join(""))
                const searchEmailResults = posts.filter((item) => item.creator.email.toLowerCase() === searchText.toLowerCase().split(" ").join(""))
                const searchOutput = [...new Set([...searchTagResults, ...searchUserResults, ...searchEmailResults])]
                setSearchResultPosts(searchOutput)
            }
        }
        searchPosts()
    }, [searchText])


    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                type='text'
                placeholder='Search for a tag or a username'
                value={searchText}
                onChange={handleSearchChange}
                required
                className='search_input peer'
                />
                {searchText && (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setSearchText("")}
                    >
                        <path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z"></path>
                    </svg>
                )}
            </form>

            {searchText ? (
                <PromptCardList
                    data={searchResultPosts}
                />
            ) : (
                <PromptCardList
                    data={posts}
                />
            )} 

        </section>
    )
}

export default Feed