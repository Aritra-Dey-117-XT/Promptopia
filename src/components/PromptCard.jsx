import Image from 'next/image';
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

function PromptCard({post, handleTagClick, handleEdit, handleDelete}) {

    const { data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()

    const [copied, setCopied] = useState("")

    const handleProfileClick = () => {
        router.push(`/profile/${post.creator._id}`)
    }

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000)
    }

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                >
                    <Image
                        src={post.creator.image}
                        alt="Creator profile Pic"
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={
                        copied === post.prompt
                            ? "/assets/icons/tick.svg"
                            : "/assets/icons/copy.svg"
                        }
                        alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            {post.tags.map((tag, index) => (
                <p
                    key={`${post._id}${index}`}
                    className='font-inter text-sm blue_gradient cursor-pointer inline'
                    onClick={(event) => handleTagClick && handleTagClick(event.target.innerText.slice(0, -2))}
                >
                    {tag[0] !== "#" ? `#${tag}` : tag}&nbsp;&nbsp;
                </p>
            ))}

            { session?.user.id === post.creator._id && pathName == "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter text-sm green_gradient hover:text-green-600 cursor-pointer'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter text-sm orange_gradient hover:text-red-500 cursor-pointer'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}

        </div>
    )
}

export default PromptCard