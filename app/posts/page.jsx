import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

async function Page() {
  const posts = await getAllPosts()
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>All blog post</h1>
        <ul className='mt-12'>
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <h4 className='text-lg font-medium'>
                  {post.frontmatter?.title}
                </h4>
                <p className='text-sm text-gray-500'>
                  {post.frontmatter?.author}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page
