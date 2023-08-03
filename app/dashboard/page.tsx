import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions)
  return (
    <pre>{JSON.stringify(session)}</pre>
  )
}

export default page