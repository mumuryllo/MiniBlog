import  "./PostDetail.modules.css"
import { Link } from "react-router-dom"

const PostDetail = ({post})=>{
    return (
        <div className="post-detail">
            <img src={post.imagem} alt={post.titulo}/>
            <h2>{post.titulo}</h2>
            <p className="createdBy">{post.createdBy}</p>

            <div className="tags">
                {post.tagsArray.map((tag) =>{
                  <p key={tag}>
                    <span>#</span>
                    {tag}
                  </p>
                })}
            </div>

         <Link to={`/posts/${post.id}`} className="btn btn-outline">
          Ler
         </Link>
        </div>
    )
}

export default PostDetail