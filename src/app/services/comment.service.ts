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
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(username)')
      .eq('blog_id', blogId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Yorumları alma hatası:', error);
      return [];
    }
    return data;
  }
}
