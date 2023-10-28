import '@/app/globals.css'

export const metadata = {
  title: '愛吃基魔人 - 最快、最準確的肯德基優惠券資訊網',
  description: '一個提供更新最快、資訊最正確的KFC肯德基優惠券資訊網站。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
