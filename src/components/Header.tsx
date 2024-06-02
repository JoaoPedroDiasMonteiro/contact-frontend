import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate('/')
  }

  return (
    <div className='container mx-auto text-center p-4 text-2xl font-bold text-indigo-600'>
      <button className='hover:underline' onClick={handleNavigate}>
        Contact list
      </button>
    </div>
  )
}
