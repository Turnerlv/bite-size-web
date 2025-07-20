import React from "react";
import Image from "next/image";

export default function ValueProp() {
    return (
        <div className='flex w-dvw h-dvh bg-primary items-center justify-center'>
            <div className='w-full max-w-[1200px] grid grid-cols-[2fr_3fr] gap-12 page-padding'>
                <div className='w-full'>
                    <h2 className='heading-2 text-primary-contrast'>What is Bite Size Design?</h2>
                </div>
                <div className="relative aspect-[4/3] max-w-full">
                    {/* <lottie-player
                        src="/animations/my-animation.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                        class="w-full h-full"
                    ></lottie-player> */}
                    <Image src="/value_prop_illustration.png" alt="Illustration" fill className="object-contain" />

                </div>
            </div>

        </div>
    )
}