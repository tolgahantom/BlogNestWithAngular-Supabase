import { Injectable } from '@angular/core';
import { supabase } from '../services/supabase-client.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  async getAllCategories(): Promise<any[]> {
    const { data, error } = await supabase.from('categories').select('*');

    if (error) {
      console.error('Kategori yükleme hatası:', error.message);
      return [];
    }

    return data ?? [];
  }

  async addCategory(name: string) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: name }])
      .select();

    if (error) {
      console.error('Kategori ekleme hatası:', error.message);
      return null;
    }

    return data;
  }

  async deleteCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      console.error('Kategori silme hatası:', error.message);
      return null;
    }

    return data;
  }
}
