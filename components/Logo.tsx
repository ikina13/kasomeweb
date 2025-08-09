import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-green-0 rounded-lg flex items-center justify-center">
         <img src="/images/kasomelogo.svg" alt="Kasome Logo" />
      </div>
      <span className="text-2xl font-bold text-gray-900">Kasome</span>
    </Link>
  )
}
