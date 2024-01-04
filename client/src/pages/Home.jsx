import { Link } from 'react-router-dom'
import Ref1 from '../assets/Ref1.jpg'
import Ref2 from '../assets/Ref2.jpg'
import ScrollingIcons from '../components/ScrollingIcons'

export default function Home() {
  return (
    <div className="">
        <h1 className="p-4 text-center text-2xl font-bold">
            <span>Crowdfund To Co-own A Tech Start-Up Today!!!</span>
        </h1>
        <nav className="bg-green-900 p-2 m-6">
            <h1 className="p-4 text-center text-white text-2xl font-bold">ARE YOU READY TO HARNESS</h1>
        </nav>
        <div className='sm:flex m-4'>
          <div>
            <img src={Ref1} alt='crowd'/>
          </div>
          <div className='p-6 font-bold text-center'>
            <h2>THE POWER</h2>
            <h3>OF THE INTERNET?!!!</h3>
            <Link to='#'>
              <h1 className='bg-green-700 cursor-pointer border p-2 text-white rounded-lg'>Purchase Units Now</h1>
            </Link>
          </div>
          <div>
            <img src={Ref2} alt='$25 per Unit'/>
          </div>
        </div>
        <div className='item-center'>
          {/* <ScrollingIcons /> */}
        </div>
    </div>
  )
}

