# **Himachal Tourism Explorer**

A modern, interactive website built with Next.js to showcase the beautiful destinations of Himachal Pradesh, India.

## **Overview**

This project is a sleek, responsive website designed to help travelers discover the majestic beauty of Himachal Pradesh. It leverages the power of Next.js for performance optimization and React components for a modular design, creating an engaging user experience for planning trips to "Devbhoomi" (Land of Gods).

The site features various sections including a hero area, destination showcases, hidden gems, seasonal guides, and accommodation options, all seamlessly integrated with smooth transitions between sections to provide travelers with comprehensive information about Himachal Pradesh.

## **Tech Stack**

* **Next.js** - React framework for production-grade applications
* **Tailwind CSS** - Utility-first CSS framework for rapid UI development
* **React** - JavaScript library for building user interfaces
* **Vercel** - Platform for deployment and hosting

## **Features**

* Interactive destination explorer with detailed information
* Dynamic hero section with captivating imagery of Himachal's landscapes
* Seasonal travel guide with recommendations based on best time to visit
* Hidden gems section showcasing lesser-known but beautiful locations
* Accommodation finder from budget hostels to luxury resorts
* Trip planner with customizable itineraries
* Responsive navigation with mobile menu
* Local experiences section highlighting culture, adventure, and cuisine
* Clean, modern UI with beautiful imagery
* Optimized performance with Next.js
* Component-based architecture for maintainability

## **Getting Started**

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## **Project Structure**

```
himachal-tourism-explorer/
├── app/
│   ├── about/                  # About page
│   ├── components/             # Reusable components
│   │   ├── Destinations.js     # Destinations component
│   │   ├── Footer.js           # Footer component
│   │   ├── Hero.js             # Hero section component
│   │   ├── Services.js         # Services section component
│   │   ├── Subscribe.js        # Newsletter subscription component
│   │   └── ui/                 # UI components
│   ├── destinations/           # Destinations pages
│   │   └── [slug]/             # Dynamic routes for each destination
│   ├── place/                  # Individual place pages
│   ├── constants/              # Constants and configuration
│   ├── hidden-gems/            # Hidden gems section
│   ├── globals.css             # Global styles
│   ├── layout.js               # Root layout component
│   └── page.js                 # Homepage
├── public/                     # Static assets
│   └── images/                 # Image assets
├── .gitignore                  # Git ignore file
├── jsconfig.json               # JavaScript configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
└── tailwind.config.js          # Tailwind CSS configuration
```

## **Customization**

You can start editing the site by modifying the components in the project:

* `app/page.js` - Main page that imports and arranges all section components
* `app/components/Hero.js` - Hero section with main headline and call-to-action
* `app/components/Destinations.js` - Popular destinations in Himachal Pradesh
* `app/components/Services.js` - Travel services and trip planning features
* `app/components/Subscribe.js` - Newsletter subscription section
* `app/components/Footer.js` - Site footer with links and copyright
* `app/place/page.js` - Template for individual destination pages
* `app/hidden-gems/page.js` - Showcase of lesser-known locations

The page auto-updates as you edit files, allowing for rapid development and iteration.

## **Destinations Featured**

* Shimla - The colonial hill station and state capital
* Manali - Adventure hub with stunning mountain views
* Dharamshala & McLeodganj - Home to Dalai Lama and Tibetan culture
* Kasol - Backpacker's paradise in Parvati Valley
* Spiti Valley - Cold desert mountain valley with Buddhist monasteries
* Dalhousie - Hill station surrounded by pine-clad valleys
* Kullu - Valley of Gods with rich cultural heritage
* Khajjiar - Mini Switzerland of India
* Kinnaur - Tribal district with apple orchards and ancient temples
* Tirthan Valley - Offbeat destination with the Great Himalayan National Park

## **Learn More**

To learn more about the technologies used in this project:

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Himachal Pradesh Tourism](https://himachaltourism.gov.in/)

## **Deployment**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### **Deploying to Vercel**

1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com/signup) if you don't already have an account.

2. **Install Vercel CLI** (Optional):
   ```bash
   npm i -g vercel
   ```

3. **Deploy via GitHub**:
   - Push your code to a GitHub repository
   - Import your project in the Vercel dashboard
   - Connect your GitHub account and select the repository
   - Configure project settings (build commands are automatically detected)
   - Click "Deploy"

4. **Deploy via CLI** (Alternative):
   ```bash
   # Login to Vercel
   vercel login

   # Deploy from project directory
   vercel
   ```

5. **Environment Variables**: If needed, add environment variables in the Vercel dashboard under Project Settings > Environment Variables.

Your site will be automatically deployed and available at a Vercel URL. You can configure a custom domain in the Vercel dashboard.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## **License**

MIT
