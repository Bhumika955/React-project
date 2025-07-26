import { useState,useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const[number,setnumber]=useState(false)
  const[character,setcharacter]=useState(false)
  const[PASSWORD,setPASSWORD]=useState("")
  const passwordref=useRef(null)
  const passwordgenerator=useCallback(()=>{  //usecallback is used for optimization purpose
    let pass=""
    let str=
    " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) str +="0123456789"
  if(character) str+="!@#$%^&*?._-+"
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random() * str.length + 1)  
    pass+=str.charAt(char)
   setPASSWORD(pass)
  }
},[length,number,character,setPASSWORD])
   
 const copypasswordtoClipboard=useCallback(()=>{
  passwordref.current?.select()
  //passwordref.current?.setSelectionRange(0,20)   //its is used for particular range selection of password here
  window.navigator.clipboard.writeText(PASSWORD)
 },[PASSWORD])
useEffect(()=>{   //useeffect use to rerun when changes done with any feature like increment or decrement on length
  passwordgenerator()
},[length,number,character,passwordgenerator])
  return (
    <>
      <h1 className='text-5xl font-semibold font-serif text-white mb-16'>PASSWORD GENERATOR</h1>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-8 text-orange-400
       bg-gray-700'>
       <h1 className='text-2xl font-semibold font-serif text-cyan-300 mb-6 '>PASSWORD GENERATOR</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
         <input
         type='text'
         value={PASSWORD}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly     
         ref={passwordref}
         />
         <button 
         onClick={copypasswordtoClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >COPY
         </button>
       </div>
         
         <div className='flex text-lg gap-x-2'>
             <div className='flex items-center gap-x-2'>
              <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor:pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label >length:{length}</label>
              </div>
              <div className='flex items-center gap-x-1 px-3'>
                <input
                  type='checkbox'
                  defaultChecked={number}
                  onChange={()=>{setnumber((prev)=>!prev)}}
                />
                <label htmlFor='numberInput'>Numbers</label>
              </div>
              <input
                  type='checkbox'
                  defaultChecked={character}
                  onChange={()=>{setcharacter((prev)=>!prev)}}
                />
                <label htmlFor='numberInput'>Characters</label>
         </div>
       </div>
    </>
  )
}

export default App
