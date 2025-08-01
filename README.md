# ✨🌐 Floid — The First Prompt Network for Everyone

Floid is a modern platform where anyone can create, share, and discover prompts for GPT, image generation, and more. It’s a sleek, thread-based website designed for the prompt engineering community—no AI-generated content, just real user creativity. (AI features may come in the future.)

<br>

> [!IMPORTANT]  
> If you find Floid useful, please star the repository on GitHub! Your support helps drive development.

<br>

> [!NOTE]  
> Floid is currently in `beta`. Expect bugs and rapid changes.

<br>

## 🙋‍♀️ **What is Floid?**

[**Floid**](https://floid.vercel.app/) is the first open prompt network for everyone. Users can generate, share, and discuss prompts for GPT, image generation, or any other AI tool. All content is user-generated—no AI Droids or bots. Floid is a community-driven space for prompt creators and enthusiasts.

<br>

## ✨ **Features**

A next-gen, thread-based platform built with [Once UI](https://once-ui.com), focused on prompt sharing and discovery.

**1.** 📝 User-Generated Prompts: Create and share prompts for GPT, image generation, and more  
**2.** 🧵 Thread-based Discussions: Discuss and refine prompts in organized threads  
**3.** ⚡ Real-time Activity: Instantly see new prompts and comments via Supabase subscriptions  
**4.** 🔐 Secure Authentication: Google OAuth integration for user management  
**5.** 📱 Responsive Design: Optimized for all devices  
**6.** 🎨 Modern UI: Built with Once UI for a polished look

<br>

[**Try Floid**](https://floid.vercel.app/) and join the prompt engineering community.

<br>

## 🛠️ **Technology Stack**

- ⚛️ **Next.js 15** (React 19)
- 🟦 **TypeScript**
- 🟨 **Javascript** (JSON config)
- 🎨 **Tailwind CSS**, **SCSS**, **PostCSS**
- 🦸 **Supabase** (Database, Auth, Real-time)
- 🧩 **Once UI** (Design System)
- 🏃 **Framer Motion**, **GSAP** (Animations)
- ▲ **Vercel** (Deployment)

<br>

## 🎥 **Demo**

See Floid in action: [Demo](https://floid.vercel.app/).

<br>

## 🌠 Getting Started

Follow these steps to run Floid locally for development.

### ⚙️ Prerequisites

**1.** Node.js 18+  
**2.** npm or yarn  
**3.** Supabase account

### 📩 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/divyanshudhruv/floid.git
cd floid
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server:**

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

<br>

<details><summary> <h2>😑 Configuration (admins)</h2>
</summary>
Configure your Supabase credentials in `.env.local`:

- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Your Supabase anon key

These are required for authentication, database, and real-time features.

</details>

<br>

## 🧩 **Design System & Customization (dev)**

- 🎨 **Tokens:**

  - Design tokens (colors, spacing, typography) in `src/resources/once-ui.config.js`
  - Custom styles in `src/resources/custom.css` and `src/app/global.css`

- 🧱 **Components:**

  - Use Once UI components from `src/components/eldoraui`, `magicui`, and `ui`

- 🌗 **Theming:**
  - Responsive, mobile-first design

<br>

## 📁 Project Structure

A brief overview of Floid's directory structure:

```
floid/
├── src/
│   ├── app/
│   │   ├── (main)/           # Main application pages & threads
│   │   ├── auth/             # Authentication
│   │   └── api/              # OG image generation
│   ├── blocks/               # Animation components
│   ├── components/           # UI components
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── package.json
```

<br>

## 👥 **Creators**

Connect with us!

**1.** **👨‍💻 Lorant One**: [Site](https://lorant.one) / [Threads](https://www.threads.net/@lorant.one) / [LinkedIn](https://www.linkedin.com/in/lorant-one/)  
**2.** **👨‍💻 Divyanshu Dhruv**: [Site](https://divyanshudhruv.is-a.dev) / [LinkedIn](https://www.linkedin.com/in/divyanshudhruv/)

<br>

## 📄 **License**

See [`LICENSE`](LICENSE) for details.

<br>

## 🏷️ **Credits**

- 🧩 Built with [Once UI](https://once-ui.com)
- 🦸 Powered by [Supabase](https://supabase.com)

<br>

_Crafted in shadows by someone unknown ☕ for the open-source community._
