import React from 'react'
import { useParams } from 'react-router-dom'

function Note() {

  const { id } = useParams();
  console.log(id);  //param의 id가 찍힘
  
  return (
    <div>Note</div>
  )
}

export default Note