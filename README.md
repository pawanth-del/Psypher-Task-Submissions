# Tier-Based Event Showcase 

This is a Next.js 14 application that displays events based on the logged-in user's tier using Clerk for authentication and Supabase for backend data storage.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pawangt2812-ui/tier-events.git
cd tier-events
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file at the root with the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL=https://udgjyffyuenfhbxzhbwe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

>  You can find these keys in:
> - **Clerk Dashboard** → API Keys section  
> - **Supabase Project Settings** → API → Project URL & anon/public key

### 4. Run the Dev Server

```bash
npm run dev
```

The app will be live at:  
 [http://localhost:3000](http://localhost:3000)

---

##  Demo User Credentials

You can log in using these demo accounts for testing different tiers:

| Tier      | Email                    | Password           |
|-----------|--------------------------|--------------------|
| Free      | free_demo@demo.com       | Free_demo@123      |     
| Silver    | silver_demo@demo.com     | Silver_demo@123    |
| Gold      | gold_demo@demo.com       | Gold_demo@123      |
| Platinum  | platinum_demo@demo.com   | Platinum_demo@123  |   

Use these accounts to explore features unlocked at each membership tier.

---

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Clerk (Authentication)
- Supabase (Database)
- Framer Motion (Animations)
- Headless UI (Modal)
- React Hot Toast (Notifications)

---

## ✨ Features

- Tier-based access control
- Sticky tier headers
- Modal event preview
- Real-time search & filter
- Tier comparison grid
- Beautiful responsive UI

---

## Supabase Table Structure

The `events` table in Supabase should have the following structure:

| Column Name   | Type       | Description                                        |
|---------------|------------|----------------------------------------------------|
| id            | UUID       | Unique identifier for the event (Primary Key)      |
| title         | Text       | Title of the event                                 |
| description   | Text       | Short description of the event                     |
| event_date    | Timestamp  | Date and time of the event                         |
| image_url     | Text       | URL to the image displayed on the card             |
| tier          | Enum       | Access tier (`free`, `silver`, `gold`, `platinum`) |

Make sure the `tier` column is of ENUM type and matches the available tiers for accurate filtering.
