import { useState, useEffect } from 'react'
import { supabase } from '../pages/api/supabase'

function UnconfirmedLink() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('unconfirmed_links').select('*')
      if (error) console.log(error)
      else setData(data)
    }
    fetchData()
  }, [])

  async function handleEdit(id) {
    // Fetch the item you want to edit
    const { data: item, error } = await supabase
      .from('unconfirmed_links')
      .select('*')
      .eq('id', id)
      .single()
    if (error) console.log(error)

    // Show a form to edit the item
    const newName = prompt('Enter a new name', item.name)
    const newDescription = prompt('Enter a new description', item.description)

    // Update the item in the database
    const { error: updateError } = await supabase
      .from('unconfirmed_links')
      .update({ name: newName, description: newDescription })
      .eq('id', id)
    if (updateError) console.log(updateError)

    // Fetch the updated data and update the state
    const { data: updatedData, error: fetchError } = await supabase.from('unconfirmed_links').select('*')
    if (fetchError) console.log(fetchError)
    else setData(updatedData)
  }

  async function handleDelete(id) {
    // Delete the item from the database
    const { error } = await supabase.from('unconfirmed_links').delete().eq('id', id)
    if (error) console.log(error)

    // Fetch the updated data and update the state
    const { data: updatedData, error: fetchError } = await supabase.from('unconfirmed_links').select('*')
    if (fetchError) console.log(fetchError)
    else setData(updatedData)
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.timestamp}</p>
          <p>{item.link}</p>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default UnconfirmedLink
