import NavItem from "./NavItem"
import DarkToggle from "./DarkToggle";
import Link from "next/link"

export default function Navigation() {
    return (
        <div className="w-full flex justify-center fixed z-999 bg-[var(--background)] border-b border-[var(--gray-a4)]" >
            <div className="w-full flex flex-row gap-auto max-w-[1200px] justify-between py-3">
                <ul className="flex flex-row gap-4 items-center">
                    <li>
                        <Link href=".">
                            <img
                                aria-hidden
                                className="nav-logo"
                                alt="File icon"
                                height={32}
                                width={125}
                            />
                        </Link>
                    </li>
                    <li><NavItem href="/about" label="About" /></li>
                    <li><NavItem href="/bites" label="Bites" /></li>
                </ul>
                <div>
                    <button>Bond</button>
                    <DarkToggle />
                </div>
            </div>
        </div>
    );
}
