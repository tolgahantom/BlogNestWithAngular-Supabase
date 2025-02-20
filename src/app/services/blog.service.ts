import { Injectable } from '@angular/core';
import { supabase } from '../services/supabase-client.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  async getAllBlogs(page: number, productsPerPage: number): Promise<any[]> {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage - 1;

    const { data, error } = await supabase
      .from('blogs')
      .select(`*, users (id, username, email), categories(name)`)
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data;
  }

  async getTotalBlogCount(): Promise<number> {
    const { count, error } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching blog count:', error);
      return 0;
    }

    return count ?? 0;
  }

  async getBlogById(id: string) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`*, users(username), categories(name)`)
      .eq('id', id);

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
  }

  async addBlog(blog: {
    title: string;
    category: string;
    content: string;
    authorId: string;
  }) {
    console.log('blog from service');
    console.log(blog);
    const { data, error } = await supabase.from('blogs').insert([
      {
        blog_title: blog.title,
        blog_category: blog.category,
        blog_content: blog.content,
        author_id: blog.authorId,
      },
    ]);
    if (error) throw error;
    return data;
  }
}
