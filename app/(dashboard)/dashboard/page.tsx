import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions)
  return (
    <pre>Dashboard</pre>
  )
}

export default page