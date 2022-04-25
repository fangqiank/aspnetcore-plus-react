import React, {useContext, useState} from 'react'
import PostContext from '../context/PostContext'
import { confirm } from "react-confirm-box"
import Modal from 'react-modal'
import { PostItem } from '../components/PostItem'
import {Spinner} from '../components/Spinner'

const customStyles = {
  content: {
		width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		position: 'relative',
  },
}

Modal.setAppElement('#root')

let postId = 0

export const PostList = () => {
	const {posts, isLoading, deletePost, addPost, updatePost} = useContext(PostContext)

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [modalIsOpen, setModalIsOpen] = useState(false)

	isLoading && <Spinner />

	const initiallizeForm = () => {
		postId = 0
		setTitle('')
		setContent('')
	}

	const openModal = () => setModalIsOpen(true)
  const closeModal = () => {
		initiallizeForm()
		setModalIsOpen(false)
	}

	const handleDelete = async (options, post) => {
    const result = await confirm(`Are you sure to delete post: ${post.title}?`, options);
    if (result) {
			deletePost(post.postId)
      return
    }
  }

	const handleEdit = post => {
		postId = post.postId
		setTitle(post.title)
		setContent(post.content)
		openModal()
	}

	const handleSubmit = e =>{
		if(postId === 0){
			e.preventDefault()

			addPost({title, content, updatedAt: new Date()})
			closeModal()
		}else{
			updatePost({postId, title, content})
			closeModal()
		}

	}

	return (
		<>
			<div className='notes'>
				<div className="notes-header">
					<h2 className="notes-title">&#9782; Posts</h2>
					<p className="notes-count">{posts.length}</p>
				</div>
					
				<div className="notes-list">
					{posts.map(post => (
							<div className='notes-list-item' key={post.postId}>
								<PostItem 
									post={post} 
									handleDelete={handleDelete}
									handleEdit={handleEdit}
								/>
							</div>
					))}
				</div>
			</div>
			
			<button className='floating-button' onClick={openModal}>
				<span style ={{fontSize:'30px'}}>
				<i className="fa-solid fa-plus"></i>
				</span>
			</button>

			<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Add Post'
		>
			<h2>Add Post</h2>
			<button className='btn-close' onClick={closeModal}>X</button>

			<form onSubmit={handleSubmit}>
			<div className='form-group'>
					<input 
						type='text'
						name="title" 
						id="title"
						className='form-control'
						placeholder='Enter the title here'
						value={title}
						onChange = {e => setTitle(e.target.value)}
					/>
				</div>

				<div className='form-group'>
					<textarea 
						name="content" 
						id="content"
						className='form-control'
						placeholder='Enter your content here'
						value={content}
						onChange = {e => setContent(e.target.value)}
					></textarea>
				</div>

				<div className='form-group'>
					<button className='btn' type='submit' >
						Submit
					</button>
				</div>
			</form>
	</Modal>
	</>
	)

	
}
