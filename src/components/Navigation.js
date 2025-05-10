import NavItem from "./NavItem"
import DarkToggle from "./DarkToggle";
import Link from "next/link"
import Button from "./Button"
import { Heart } from 'lucide-react';

export default function Navigation() {
    return (
        <div className="w-full flex justify-center fixed z-999 bg-surface backdrop-blur-xs border-b border-gray-a-4" >
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
                <div className="flex flex-row">
                    <Button variant="subtle" icon={Heart} iconPosition="right">Bond</Button>
                    <DarkToggle />
                </div>
            </div>
        </div >
    );
}
