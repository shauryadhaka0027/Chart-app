import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../Hooks/useSendMessage';
import { MdAddPhotoAlternate } from 'react-icons/md';

const MessageInput = () => {
	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { loading, sendMessage } = useSendMessage();

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setIsDialogOpen(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (message !== '') {
			formData.append('message', message);
		}
		if (image) {
			formData.append('image', image);
		}
		if (!message && !image) return;
		await sendMessage(formData);
		console.log(formData);
		setMessage('');
		setImage('');
		setIsDialogOpen(false);
	};

	return (
		<>
			<form className='px-4 my-3' onSubmit={handleSubmit}>
				<div className='w-full relative'>
					<input
						type='text'
						className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
						placeholder='Send a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<input
						style={{ display: 'none' }}
						id='imageUpload'
						type='file'
						name='image'
						multiple
						accept='image/*,video/*,audio/*'
						onChange={handleFileChange}
					/>

					{isDialogOpen && (
						<dialog id='my_modal_1' className='modal' open>
							<div className='modal-box'>
								<h3 className='font-bold text-lg'>Confirm Send</h3>
								<p className='py-4'>Are you sure you want to send the message?</p>


								<label htmlFor='imageUpload' >
									<MdAddPhotoAlternate
										size={100}
										className='mr-2 h-25 w-100 cursor-pointer '

									/>
									
								</label>
								<div className='modal-action'>
									<button className='btn' type='submit'>
										Send
									</button>
									<button className='btn' onClick={() => {
									
										setIsDialogOpen(!isDialogOpen)
									}}>
										Cancel
									</button>
								</div>
							</div>
						</dialog>
					)}

					<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
						{loading ? <span className='loading loading-spinner'></span> : <BsSend />}
					</button>

					<label className='cursor-pointer absolute inset-y-0 end-8 flex items-center pe-3'>
						<MdAddPhotoAlternate
							size={24}
							className='mr-2'
							onClick={() => setIsDialogOpen(true)}
						/>
					</label>
				</div>
			</form>
		</>
	);
};

export default MessageInput;
