import { Injectable } from '@angular/core';
import { supabase } from '../services/supabase-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> =
    this.currentUserSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  private async loadUser() {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session?.user) {
      this.fetchUser(sessionData.session.user.id);
    }
  }

  private async fetchUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, role')
      .eq('id', userId)
      .single();

    if (data) {
      const user: UserModel = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
      };

      this.currentUserSubject.next(user);
    }
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Kayıt hatası:', error.message);
      throw new Error(error.message);
    }

    const userId = data.user?.id;

    console.log('Kullanıcı kaydedildi:', data.user);
    console.log(this.currentUser$);

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId, // Foreign Key olarak Auth ID'yi kullan
        username: username,
        email: email,
        role: 'user',
      },
    ]);

    if (insertError) {
      console.error('Veritabanına ekleme hatası:', insertError.message);
      throw new Error(insertError.message);
    }

    return data.user;
  }

  async login(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Giriş hatası:', error.message);
      throw new Error(error.message);
    }

    const userId = data.user?.id;
    if (userId) {
      await this.fetchUser(userId);
    }

    return data.user;
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Çıkış hatası:', error.message);
      throw new Error(error.message);
    }

    this.currentUserSubject.next(null);
  }
}
