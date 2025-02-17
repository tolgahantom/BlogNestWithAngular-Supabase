import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogArray = [
    {
      id: 1,
      type: 'Aperatives',
      title: 'Delicious Homemade Pasta',
      author: 'John Doe',
      date: 'April 5, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 2,
      type: 'Desserts',
      title: 'The Best Chocolate Cake',
      author: 'Jane Smith',
      date: 'April 12, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 3,
      type: 'Main Course',
      title: 'Healthy Smoothie Recipes',
      author: 'Emily Johnson',
      date: 'April 19, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 4,
      type: 'Drinks',
      title: 'Easy-to-Make Salad Ideas',
      author: 'Michael Brown',
      date: 'April 7, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 5,
      type: 'Aperatives',
      title: 'Topping Marzipan Tart Cheesecake Sweet Lollipop',
      author: 'John Doe',
      date: 'April 22, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 6,
      type: 'Desserts',
      title: 'Healthy Smoothie Recipes',
      author: 'Jane Smith',
      date: 'April 15, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 7,
      type: 'Main Course',
      title: 'Delicious Homemade Pasta',
      author: 'Emily Johnson',
      date: 'April 9, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 8,
      type: 'Drinks',
      title: 'The Best Chocolate Cake',
      author: 'Michael Brown',
      date: 'April 26, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 9,
      type: 'Aperatives',
      title: 'Easy-to-Make Salad Ideas',
      author: 'John Doe',
      date: 'April 2, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 10,
      type: 'Desserts',
      title: 'Topping Marzipan Tart Cheesecake Sweet Lollipop',
      author: 'Jane Smith',
      date: 'April 14, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 11,
      type: 'Main Course',
      title: 'The Best Chocolate Cake',
      author: 'Emily Johnson',
      date: 'April 30, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 12,
      type: 'Drinks',
      title: 'Healthy Smoothie Recipes',
      author: 'Michael Brown',
      date: 'April 8, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 13,
      type: 'Aperatives',
      title: 'Easy-to-Make Salad Ideas',
      author: 'John Doe',
      date: 'April 21, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
    {
      id: 14,
      type: 'Desserts',
      title: 'Delicious Homemade Pasta',
      author: 'Jane Smith',
      date: 'April 3, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-800x530.jpg',
    },
    {
      id: 15,
      type: 'Main Course',
      title: 'Topping Marzipan Tart Cheesecake Sweet Lollipop',
      author: 'Emily Johnson',
      date: 'April 18, 2021',
      authorImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/autor-1@2x.png',
      blogImage:
        'https://startersites.io/blocksy/tasty/wp-content/uploads/2021/04/ella-olsson-Pb9aFVR9-Bk-unsplash-500x375.jpg',
    },
  ];
  constructor() {}
  getAllBlogs(page: number, productsPerPage: number): Observable<any[]> {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return of(this.blogArray.slice(startIndex, endIndex));
  }

  getTotalBlogCount(): number {
    return this.blogArray.length;
  }
}
