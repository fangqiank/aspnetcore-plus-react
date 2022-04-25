import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import {BackButton} from '../components/BackButton'
import {toast} from 'react-toastify'

export const PostDetail = () => {
	const {id} = useParams()
	// const navigate = useNavigate() 

	const [post, setPost] = useState(null)

	useEffect(() => {
		createAPIEndpoint(ENDPOINTS.POST)
		.fetchById(id)
		.then(res => {
			setPost(res.data)
		})
		.catch(err => {
			toast.error(`Error fetching note ${id}`)
		})
	},[id])

	return (
		<div className='note-page'>
			<BackButton url={'/'}/>
			{
				post && (
					<>
						<h2>
							Post ID: {post.postId}
							<span className={`status status-${post.status}`}>
								{post.status}
							</span>
						</h2>

						<h2>
							Date submitted: {new Date(post.updatedAt).toLocaleDateString('en-US')}
						</h2>
						<hr 
						  style={{
								height:'1px',
								border:'none',
								color:'#333',
								backgroundColor:'#333' 
							}}
						/>
						<div className='note-desc'>
							{/* <h3>Content of Note</h3> */}
							<p>{post.content}</p>
						</div>
					</>
				)
			}
	</div>
	)
}
