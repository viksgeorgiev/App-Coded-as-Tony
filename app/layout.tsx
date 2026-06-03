import './globals.css'

export const metadata = {
  title: 'Daily Task Manager',
  description: 'A simple, distraction-free todo app for daily work, personal projects, and long-term goals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="app-body">
        <div className="app-wrapper">{children}</div>
      </body>
    </html>
  )
}
