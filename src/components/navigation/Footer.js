import React from 'react';
import { NAV_ITEMS } from '@/config/navigation';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="text-white py-12">
            <div className="w-full max-w-[1200px] page-padding mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Section */}
                    <div className="md:col-span-1 sm:mx-8">
                        <div className="flex items-center space-x-2">
                            <Link href='.' className="focus-visible:custom-focus">
                                <img
                                    aria-hidden
                                    className="min-w-[115px] nav-logo"
                                    alt="File icon"
                                    height={32}
                                    width={115}
                                />
                            </Link>
                        </div>
                        <p className="font-work text-gray-11 text-sm mt-8">Exploring the intersection of design and development through reusable patterns and front-end experiments.</p>
                        <div className='mt-8 flex flex-row gap-2'>
                            {[
                                { url: 'https://www.linkedin.com/company/bite-size-design/', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" aria-hidden="true"><path d="M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z" fill="currentColor"></path></svg> },
                                { url: 'https://www.linkedin.com/company/bite-size-design/', icon: <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="currentColor"></path></svg> },
                                { url: 'https://www.linkedin.com/company/bite-size-design/', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="currentColor"></path></svg> }
                            ].map((social, index) => (
                                <a key={index} href={social.url} target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-gray-a11 flex items-center w-8 h-8 p-2 rounded-full border border-border focus-visible:custom-focus'>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-1 flex flex-wrap md:flex-nowrap md:flex-row md:justify-end gap-6">
                        {NAV_ITEMS.map((section, index) => (
                            <div key={index} className='mx-6'>
                                <h3 className="font-roboto text-sm text-foreground uppercase mb-4 whitespace-nowrap"> / {section.label}</h3>
                                <ul className="font-work text-sm space-y-4 text-gray-11">
                                    {section.items.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.href} className="hover:text-foreground focus-visible:custom-focus whitespace-nowrap">{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className='mx-6'>
                            <h3 className="font-roboto text-sm text-foreground uppercase mb-4 whitespace-nowrap"> / Support</h3>
                            <ul className="font-work text-sm space-y-4 text-gray-11">
                                <li key={0}>
                                    <a href='.' className="hover:text-foreground focus-visible:custom-focus whitespace-nowrap">Contact us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border mt-8 pt-8">
                    <p className="text-gray-8 text-sm text-left">© 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}