'use client'

import { useRouter } from 'next/navigation'

function ContactButton() {
  const router = useRouter()
  function handleClick() {
    router.push('/contact')
  }
  return <button onClick={handleClick}>Contact</button>
}

export default ContactButton
