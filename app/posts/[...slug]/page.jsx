import { getAllPosts, getPostBySlug } from '@/lib/posts'

// Statically generates routes at build time instead of on demand at request time
export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map(post => ({ slug: [post.slug] }))
}

async function Page({ params }) {
  const { slug } = params
  const { content, frontmatter } = await getPostBySlug(slug[0])
  return (
    <section className='py-24'>
      <div className='container'>
        {/* Post frontmatter */}
        <header className='rounded bg-gray-100 p-8'>
          <h1 className='font-serif text-3xl'>{frontmatter.title}</h1>
          <p className='text-sm font-light uppercase leading-3'>
            {frontmatter.author}
          </p>
        </header>
        {/* Post content */}
        <main className='prose mt-12'>{content}</main>
      </div>
    </section>
  )
}

export default Page
