# BlockVideo - Decentralized Video Creation Platform

BlockVideo empowers creators to generate, protect, and distribute videos automatically using a decentralized platform powered by blockchain technology.

## 🚀 Features

### Core Functionality
- **Automated Video Generation**: AI-powered video creation with customizable templates
- **Royalty-Free Media Library**: Curated collection of images, video clips, and background music
- **Blockchain-based IP Protection**: Register and protect intellectual property on-chain
- **Cross-Promotion Network**: Collaborative platform for expanding audience reach
- **Credit-based Microtransactions**: Pay-per-use model with flexible pricing

### Technical Features
- **Base MiniApp Integration**: Seamless wallet connection and on-chain transactions
- **Farcaster Frame Support**: Social primitives and cross-promotion capabilities
- **Decentralized Storage**: IPFS/Arweave integration for content permanence
- **Smart Contract Integration**: Automated IP registration and credit management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network, OnchainKit, Wagmi, Viem
- **Database**: Upstash Redis for data persistence
- **Social**: Farcaster MiniApp SDK
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Coinbase Developer Platform account (for OnchainKit)
- Upstash Redis database
- Base network wallet

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/f7c6f19e-9c35-4916-8088-3af2b24e770c.git
   cd f7c6f19e-9c35-4916-8088-3af2b24e770c
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_cdp_api_key
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   NEXT_PUBLIC_FARCASTER_CLIENT_ID=your_farcaster_client_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── videos/       # Video management
│   │   ├── media/        # Media assets
│   │   ├── credits/      # Credit transactions
│   │   └── ip/           # IP registration
│   ├── components/       # React components
│   │   ├── AppShell.tsx
│   │   ├── VideoTemplateSelector.tsx
│   │   ├── MediaAssetBrowser.tsx
│   │   └── ...
│   ├── providers.tsx     # Context providers
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── lib/                  # Utility libraries
│   ├── services/        # Database and API services
│   ├── types.ts         # TypeScript type definitions
│   └── utils/           # Helper functions
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Design System

BlockVideo uses a custom design system with the following tokens:

### Colors
- **Primary**: `hsl(222, 88%, 57%)` - Professional blue
- **Accent**: `hsl(340, 90%, 60%)` - Vibrant pink
- **Background**: `hsl(222, 15%, 96%)` - Light gray
- **Surface**: `hsl(0, 0%, 100%)` - White
- **Text Primary**: `hsl(222, 15%, 15%)` - Dark gray
- **Text Secondary**: `hsl(222, 15%, 30%)` - Medium gray

### Typography
- **Display**: `text-4xl font-bold`
- **Heading**: `text-2xl font-semibold`
- **Body**: `text-base leading-7`
- **Caption**: `text-sm text-textSecondary`

### Spacing & Layout
- **Grid**: 12-column fluid layout with 24px gutter
- **Container**: `max-w-7xl px-6`
- **Spacing Scale**: 8px, 12px, 20px increments

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/connect` - Connect wallet and create/retrieve user

### Videos
- `GET /api/videos` - Get user's videos
- `POST /api/videos/generate` - Generate new video

### Media Assets
- `GET /api/media` - Get royalty-free media assets

### Credits
- `POST /api/credits/purchase` - Purchase credits

### IP Protection
- `POST /api/ip/register` - Register IP on blockchain

## 💰 Business Model

BlockVideo operates on a microtransaction model:

- **Video Generation**: $0.50 - $2.00 per video (tiered by complexity)
- **Bulk Credits**: $20/month for 20 credits (subscription)
- **IP Registration**: Additional fee for blockchain protection
- **Cross-Promotion**: Optional network participation

## 🔐 Smart Contracts

The platform integrates with smart contracts on Base for:

1. **Credit Token Contract**: ERC-20 token for platform credits
2. **IP Registry Contract**: NFT-based IP registration system
3. **Cross-Promotion Contract**: Decentralized promotion network

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_production_cdp_key
UPSTASH_REDIS_REST_URL=your_production_redis_url
UPSTASH_REDIS_REST_TOKEN=your_production_redis_token
NEXT_PUBLIC_FARCASTER_CLIENT_ID=your_production_farcaster_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Coinbase OnchainKit](https://docs.base.org/base-app/docs/tools/onchainkit/overview) for Base integration
- [Farcaster](https://docs.farcaster.xyz/) for social primitives
- [Upstash](https://upstash.com/) for Redis hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support, please contact the development team or open an issue on GitHub.

---

Built with ❤️ for the decentralized future of content creation.
