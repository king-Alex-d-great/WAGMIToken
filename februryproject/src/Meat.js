import React from 'react';
import './index.css';
//import './App.css'
import image from './Images/buildspaceImage-removebg-preview.png'

function Meat(props) {
    return (
        <main>
            <section >
                   <div className='image'>
                        <img src={image} alt="us" className="App-logo"/>
                   </div>
                   <div className='inputs'>
                       <div className="texts">
                           <input placeholder='Enter an address '/>
                           <input placeholder='WAGMI amount'/>
                       </div>

                       <button>
                            Make a friend Happy
                       </button>
                      
                   </div>
            </section>

        </main>
    )

}

export default Meat;