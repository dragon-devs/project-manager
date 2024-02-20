export {default} from 'next-auth/middleware';

export const config = {
  matcher: [
      '/projects/new',
      '/projects/edit/:id+',
      '/teams'
  ]
}