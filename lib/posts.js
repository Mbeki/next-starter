import fs from 'fs'
import path from 'path'

import { compileMDX } from 'next-mdx-remote/rsc'

import rehypePrettyCode from 'rehype-pretty-code'
import Newsletter from '@/app/components/ui/Newsletter'

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: '' }]
    }
  },
  onVisitHighLightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisisitHighlightedWord(node) {
    node.properties.className = ['highlited', 'word']
  }
}

const rootDirectory = path.join(process.cwd(), 'content')

const components = {
  h1: props => (
    <h1 {...props} className='text-emerald-400'>
      {props.children}
    </h1>
  ),
  Newsletter: Newsletter
}

export async function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
      }
    }
  })
  return { content, frontmatter, slug: realSlug }
}

export async function getAllPosts() {
  const files = fs.readdirSync(rootDirectory)
  let posts = []
  for (const file of files) {
    const post = await getPostBySlug(file)
    posts = [...posts, post]
  }
  return posts
}
