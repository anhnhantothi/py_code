// types.ts
export interface CommentDto {
  id: number;
  userId: number;
  username: string;
  practiceId: number;
  content: string;
  likes: number;
  created_at: string;
  replies: CommentDto[];
}
