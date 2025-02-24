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
      .order('upload_date', { ascending: false })
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data;
  }

  async getLastBlog() {
    const { data, error } = await supabase
      .from('blogs')
      .select(`*, users (id, username, email), categories(name)`)
      .order('upload_date', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching latest blog:', error);
      return null;
    }

    return data;
  }

  async getMostReadBlog() {
    const { data, error } = await supabase
      .from('blogs')
      .select(`*, users (id, username, email), categories(name)`)
      .order('views', { ascending: false })
      .limit(3);

    if (error) {
      console.error('En çok okunan blog getirilemedi:', error);
      return null;
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
    let imageUrl =
      'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png';

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

  async getUserBlogs(userId: string) {
    const { data: readBlogs, error: readError } = await supabase
      .from('blog_views')
      .select('blogs(*, categories(name))')
      .eq('user_id', userId)
      .order('viewed_at', { ascending: false });

    const { data: writtenBlogs, error: writtenError } = await supabase
      .from('blogs')
      .select('*, categories(name)')
      .eq('author_id', userId)
      .order('upload_date', { ascending: false });

    if (readError) console.error('Okunan blogları çekerken hata:', readError);
    if (writtenError)
      console.error('Yazılan blogları çekerken hata:', writtenError);

    return {
      readBlogs: readBlogs || [],
      writtenBlogs: writtenBlogs || [],
    };
  }

  async increaseViewCount(blogId: string, userId: string) {
    const { data: existingView, error } = await supabase
      .from('blog_views')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_id', userId)
      .single();

    if (existingView) {
      console.log('Kullanıcı zaten bu blogu okudu, views artırılmadı.');
      return;
    }

    const { error: insertError } = await supabase
      .from('blog_views')
      .insert([{ blog_id: blogId, user_id: userId, viewed_at: new Date() }]);

    if (insertError) {
      console.error('Blog görüntüleme kaydı eklenemedi:', insertError.message);
      return;
    }

    const { data: blogData, error: fetchError } = await supabase
      .from('blogs')
      .select('views')
      .eq('id', blogId)
      .single();

    if (fetchError || !blogData) {
      console.error(
        'Mevcut görüntüleme sayısı alınamadı:',
        fetchError?.message
      );
      return;
    }

    const newViewCount = (blogData.views || 0) + 1;

    const { error: updateError } = await supabase
      .from('blogs')
      .update({ views: newViewCount })
      .eq('id', blogId);

    if (updateError) {
      console.error('Görüntüleme sayısı artırılamadı:', updateError.message);
    }
  }

  async editBlog(blogId: string, updatedBlog: any, newFile?: File) {
    try {
      let imageUrl = updatedBlog.images;

      if (newFile) {
        console.log('Yeni dosya yükleniyor...');
        const res = await this.uploadImage(newFile);
        if (res) {
          console.log('eski resmi silsen iyi olur kanka');
          imageUrl = res;
        }
      }

      const { error: updateError } = await supabase
        .from('blogs')
        .update({
          blog_title: updatedBlog.title,
          blog_category: updatedBlog.category,
          blog_content: updatedBlog.content,
          author_id: updatedBlog.authorId,
          images: imageUrl,
        })
        .eq('id', blogId);

      if (updateError) throw updateError;

      return { success: true };
    } catch (error) {
      console.error('Blog güncelleme hatası:', error);
      return { success: false, error };
    }
  }
}
