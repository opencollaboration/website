export interface NewsItem {
    id: number;
    title: string;
    snippet: string;
    image: string;
    link: string;
  }
  
  export const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'SvelteKit 2.0 Released',
      snippet: 'The latest version of SvelteKit brings lightning-fast performance improvements and a more streamlined developer experience.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      link: '#',
    },
    {
      id: 2,
      title: 'Tailwind CSS Reaches New Heights',
      snippet: 'With the introduction of new utility classes for container queries, Tailwind continues to be a favorite among developers.',
      image: 'https://images.unsplash.com/photo-1644343290018-a6d88a42aff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      link: '#',
    },
    {
      id: 3,
      title: 'The Future of Web Development is Component-Based',
      snippet: 'Experts discuss why building with isolated, reusable components is the most efficient way to create modern web applications.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      link: '#',
    },
      {
      id: 4,
      title: 'Understanding Server-Side Rendering (SSR)',
      snippet: 'Learn how SSR can dramatically improve your site\'s SEO and initial load times for a better user experience.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      link: '#',
    },
  ];