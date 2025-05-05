import NavItem from "./NavItem"
import Link from "next/link"
import Image from "next/image"

export default function Navigation() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full flex flex-row gap-auto max-w-[1200px] justify-between py-3">
                <ul className="flex flex-row gap-4 items-center">
                    <li><Link href=".">
                        <Image
                            aria-hidden
                            src="/biteSize_outline_full.svg"
                            alt="File icon"
                            height={32}
                            width={125}
                        />
                    </Link></li>
                    <li><NavItem href="/about" label="About" /></li>
                    <li><NavItem href="/bites" label="Bites" /></li>
                </ul>
                <button>Bond</button>
            </div>

        </div>
    )
}