import { useState } from 'react';
import CommentInputBox from './CommentInput';
import CommentCard, { CommentDto } from './CommentCard';

const CommentSection = () => {
    const [comments, setComments] = useState<CommentDto[]>([
        { id: 1, name: 'tung9******@gmail.com', time: '2 tháng trước', content: 'có ai ko ta', likes: 0, replies: [], hidden: false },
        {
            id: 2, name: '0342247464', time: 'một phút trước', content: '123123', likes: 0, replies: [
                { id: 3, name: 'tung9******@gmail.com', time: '2 tháng trước', content: 'có ai ko ta', likes: 0, replies: [], hidden: false },
            ], hidden: false
        },
    ]);


    const handleCommentSubmit = (newComment:string) => {
        if (newComment.trim()) {
            const newId = comments.length + 1;
            const newCommentData :CommentDto= {
                id: newId,
                name: '0342247464',
                time: 'vừa xong',
                content: newComment.trim(),
                likes: 0,
                replies: [],
                hidden: false,
            };
            setComments([newCommentData, ...comments]);
        }
    };

    
    const handleReplySubmit = (newComment:string,id:number) => {
        const cmt = comments.find((e)=>e.id == id);
        if(!cmt) return 
        if (newComment.trim()) {
            const newId = cmt?.replies.length  + 1+100;
            const newCommentData :CommentDto= {
                id: newId,
                name: '0342247464',
                time: 'vừa xong',
                content: newComment.trim(),
                likes: 0,
                replies: [],
                hidden: false,
            };
            const update = comments.map((e) => {
                if (e.id === id) {
                    e.replies = [...e.replies, newCommentData];
                }
                return e;
            });
            setComments(update);
        }
    };


        
    const handleLike = (id:number) => {  
        const update = comments.map((e) => {
            if (e.id == id) {
                return {...e,likes:e.likes+1}
            }
            const res = e.replies.map((rep)=>{
              if(rep.id == id){
                return {...rep,likes:rep.likes+1}
              } 
              return rep
            })
            return {...e,replies:res};
        });
        setComments(update);
    };

    return (
        <div className="max-w-2xl mx-auto py-4 px-6 bg-white rounded-lg shadow-sm">
            <CommentInputBox handleCommentSubmit={handleCommentSubmit }/>
            <div className="space-y-6">
                {comments.map((comment) => 
                <CommentCard  
                comment={comment} 
                handleReply={(e:string)=>handleReplySubmit(e,comment.id)}
                handleLike={ (e:number)=>handleLike(e)}/>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
