// types.ts
export interface CommentDto {
  id: number;
  userId: number;
  username: string;
  practiceId: number;
  content: string;
  likes: number;
  createdAt: string;
  replies: CommentDto[];
}
