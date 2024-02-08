import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams,  Link} from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import CreditsComp from "../components/CreditsComp";
import { Rating } from 'flowbite-react';
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

 
  const handleLike = async (postId) => {
    try {
    
      const res = await fetch(`/api/post/likePost/${postId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setPost({ ...post,
          likes: data.likes,
          numberOfLikes: data.likes.length,}
       
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=2`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl'></Spinner>
    </div>
  )
  return <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-scren">
    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl ">{post && post.title}</h1>
    <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
    <Button color='gray' pill size='xs'>{post && post.category}</Button>
   
 
    </Link>
    <Rating className=" mt-5 mx-auto ">
      <Rating.Star filled={post.numberOfStars >=1 ? true : false}/>
      <Rating.Star filled={post.numberOfStars >= 2 ? true : false}/>
      <Rating.Star filled={post.numberOfStars >= 3 ? true : false}/>
      <Rating.Star filled={post.numberOfStars >=4 ? true : false}/>
      <Rating.Star filled={post.numberOfStars === 5 ? true : false} />
    </Rating>
    <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-5 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          Lectura de {post && (post.content.length / 1000).toFixed(0)} minutos 
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content border-b border-slate-500'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      >
        
      </div>
      <div className='flex justify-between p-1 mx-auto w-full max-w-2xl text-xs'>
       <CreditsComp post={post}  onLike={handleLike}/>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
      </div>
      <CommentSection postId ={post._id}></CommentSection>

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Publicaciones recientes</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
  </main>;
}
