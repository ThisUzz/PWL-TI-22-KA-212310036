import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const MySkeleton = () => {
  return (
    <div className='my-skeleton'>
        <Skeleton height={40} style={{ marginBottom:10 }} />
        <Skeleton count={3} />
    </div>
  )
}