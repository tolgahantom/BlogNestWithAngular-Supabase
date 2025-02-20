import { Injectable } from '@angular/core';
import { supabase } from '../services/supabase-client.service';

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

  async uploadImage(file: File): Promise<string | null> {
    if (!file) return null;

    const fileName = `${new Date().getTime()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('blog_images')
      .upload(fileName, file);

    if (error) {
      console.error('Resim yükleme hatası:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog_images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl || null;
  }

  async addBlog(
    blog: {
      title: string;
      category: string;
      content: string;
      authorId: string;
    },
    file?: File
  ) {
    let imageUrl = 'https://via.placeholder.com/500';

    if (file) {
      const uploadedUrl = await this.uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const { data, error } = await supabase.from('blogs').insert([
      {
        blog_title: blog.title,
        blog_category: blog.category,
        blog_content: blog.content,
        author_id: blog.authorId,
        images: imageUrl,
      },
    ]);
    if (error) throw error;
    return data;
  }
}
