import React from 'react'
import {Link} from 'react-router-dom'

const optionsWithClonOnOverlayclick = {
  closeOnOverlayClick: true
}

export const PostItem = ({post, handleDelete, handleEdit}) => {

	return (
		<>
			<Link to={`posts/${post.postId}`}>
				<h3>{post.title}</h3>
			</Link>	

			<p>
				<span>{new Date(post.updatedAt).toLocaleDateString('en-US')}</span>
				{/* {note.body} */}
				<span style={{'marginLeft': '20px'}}>
					<i 
						className="fa-solid fa-trash-can" 
						style={{'color': '#C70039'}}
						onClick={() => handleDelete(optionsWithClonOnOverlayclick, post)}
					></i>
				</span>
				<span style={{'marginLeft': '5px'}}>
					<i 
						className="fa-solid fa-pen"
						style={{'color': '#0082C7'}}
						onClick={() => handleEdit(post)}
					>
					</i>
				</span>
			</p>
		</>
	)
}
