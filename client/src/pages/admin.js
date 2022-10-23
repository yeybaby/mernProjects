import React from 'react'
import { useEffect } from 'react'

export default function admin() {
  useEffect( () => {
    fetch('/admin').then(res => res.json()).then(data => console.log(data))
  },[])

  return (
    <div>this is the admin page</div>
  )
}
