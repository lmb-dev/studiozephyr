import { FaGithub } from "react-icons/fa6";
import Link from 'next/link';

export default function Watermark() {

  return (
    <Link
      href="https://github.com/lmb-dev"
      target="_blank"
      className="fixed bottom-1 left-4 opacity-25 hover:opacity-100 flex text-sm gap-2 transition"
    >
      Site by lmb-dev
      <FaGithub />
    </Link>
  )
}