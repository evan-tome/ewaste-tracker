import React from 'react'
import './Programs.css'
import program_1 from '../../assets/program-1.png'
import program_2 from '../../assets/program-2.png'
import program_3 from '../../assets/program-3.png'

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img src={program_1} alt=''></img>
            <div className="caption">
                <p>Check your profile</p>
            </div>
        </div>
        <div className="program">
            <img src={program_2} alt=''></img>
            <div className="caption">
                <p>Find a nearby location</p>
            </div>
        </div>
        <div className="program">
            <img src={program_3} alt=''></img>
            <div className="caption">
                <p>Compete for rewards</p>
            </div>
        </div>
    </div>
  )
}

export default Programs
