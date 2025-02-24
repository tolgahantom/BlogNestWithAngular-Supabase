import { Injectable } from '@angular/core';
import { supabase } from './supabase-client.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  async addComment(
    blogId: string,
    userId: string,
    content: string,
    parentId: string | null = null
  ) {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        { blog_id: blogId, user_id: userId, content, parent_id: parentId },
      ]);

    if (error) {
      console.error('Yorum ekleme hatası:', error);
      return null;
    }
    return data;
  }

  async getComments(blogId: string) {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*, users(username)')
      .eq('blog_id', blogId)
      .is('parent_id', null)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Yorumları alma hatası:', error);
      return [];
    }

    for (const comment of comments) {
      comment.replies = await this.getRepliesForComment(comment.id);
    }

    return comments;
  }

  async getRepliesForComment(parentId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(username)')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Yanıtlar çekilemedi:', error);
      return [];
    }

    return data;
  }
}
