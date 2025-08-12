import React from "react";
import Image from "next/image";
import AnimatedIllustration from "@/components/AnimatedIllustration";

export default function ValueProp() {
    return (
        <section className='flex w-dvw h-dvh bg-primary items-center justify-center pt-[74px]'>
            <div className='w-full max-w-[1200px] grid md:grid-cols-[3fr_5fr] gap-8 page-padding'>
                <div className='w-full'>
                    <h2 className='heading-2 text-primary-contrast'>What is Bite Size Design?</h2>
                </div>
                <AnimatedIllustration
                    jsonPath="/bite_size_hero.json"
                    fallbackSrc="/value_prop_illustration.png"
                />

            </div>

        </section>
    )
}