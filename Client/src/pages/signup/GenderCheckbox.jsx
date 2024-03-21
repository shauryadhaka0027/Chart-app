import React from 'react'

const GenderCheckbox = ({onCheckbox,onSelectedGender}) => {
  return (
    <div className='flex'>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer  ${onSelectedGender==="male" ?"selected":""}`}>
    					<span className='label-text'>Male</span>
    					<input type='checkbox' className='checkbox border-slate-900' checked={onSelectedGender==="male"}
                        onChange={()=>{onCheckbox("male")}} />
    				</label>
    			</div>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer  ${onSelectedGender==="female" ?"selected":""}`}>
    					<span className='label-text'>Female</span>
    					<input type='checkbox' className='checkbox border-slate-900'   checked={onSelectedGender==="female"}
                        onChange={()=>{onCheckbox("female")}}
                        
                        />
    				</label>
    			</div>
    		</div>
  )
}

export default GenderCheckbox
