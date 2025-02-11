# ByteURL

<div align="center">
<a href="https://github.com/debsouryadatta/byteurl">
    <img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1739300258/projects/byte_url.png" alt="Logo" width="800" height="500">
  </a>
</div>

<div align="center">
  <h3>Smart URL Shortener with AI-Powered Features</h3>

  <p align="center">
    A modern URL shortener that combines AI capabilities with efficient link management
    <br />
    <a href="https://byteurl-eight.vercel.app/">View Live Site</a>
    ·
    <a href="https://github.com/debsouryadatta/byteurl/issues">Report Bug</a>
    ·
    <a href="https://github.com/debsouryadatta/byteurl/issues">Request Feature</a>
  </p>
</div>

## About The Project

ByteURL is a modern URL shortener that goes beyond basic link shortening. It combines AI capabilities with efficient link management features, providing users with a powerful tool for managing and sharing URLs. The application offers AI-generated names for your links, QR code generation, and page content summaries, all wrapped in a beautiful and responsive UI built with Next.js and Shadcn components.

## Features

- **Smart URL Shortening**: Create short, memorable links with custom or AI-generated names
- **QR Code Generation**: Automatically generate QR codes for all shortened URLs
- **AI-Powered Summaries**: Get AI-generated summaries of the linked web pages
- **User Authentication**: Secure user authentication powered by Clerk
- **Link Management**: View, edit, and delete your shortened URLs
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Real-time Updates**: Instant feedback and updates using Next.js App Router
- **Database Integration**: Reliable data storage with Prisma and PostgreSQL
- **Modern UI Components**: Built with Shadcn UI and styled with Tailwind CSS
- **Icon Integration**: Consistent icon design using Lucide icons

## Technologies Used

  - [Next.js](https://nextjs.org/) - React Framework
  - [TypeScript](https://www.typescriptlang.org/) - Programming Language
  - [Tailwind CSS](https://tailwindcss.com) - Styling
  - [Shadcn UI](https://ui.shadcn.com/) - UI Components
  - [Lucide Icons](https://lucide.dev/) - Icon Library
  - [Next.js App Router](https://nextjs.org/docs/app) - Server Components and API Routes
  - [Prisma](https://www.prisma.io/) - Database ORM
  - [PostgreSQL](https://www.postgresql.org/) - Database
  - [Clerk](https://clerk.com/) - Authentication
  - [Cloudinary](https://cloudinary.com/) - Image Storage for QR Codes
  - [Gemini API](https://ai.google.dev/) - AI-powered name generation and summaries
  - [Crawl4AI](https://crawl4ai.com/) - Web page content extraction

## Getting Started

1. Clone the repository
   ```sh
   git clone https://github.com/debsouryadatta/byteurl.git
   ```

2. Install dependencies
   ```sh
   pnpm install
   ```

3. Set up environment variables
   ```env
    DATABASE_URL=
    
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
    CLERK_WEBHOOK_SECRET=

    # Base URL
    NEXT_PUBLIC_BASE_URL=
    CRAWL4AI_BE_URL=

    # Cloudinary
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_UPLOAD_PRESET=
    CLOUDINARY_FOLDER=

    # Gemini
    GEMINI_API_KEY=
   ```

4. Start the development server
   ```sh
   pnpm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Debsourya Datta - [@debsourya005](https://twitter.com/debsourya005)

Project Link: [https://github.com/debsouryadatta/byteurl](https://github.com/debsouryadatta/byteurl)