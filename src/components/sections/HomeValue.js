import React from "react";
import AnimatedIllustration from "@/components/AnimatedIllustration";

export default function ValueProp() {
    return (
        <section className='flex w-dvw h-dvh bg-primary items-center justify-center pt-[74px]'>
            <div className='w-full max-w-[1200px] grid md:grid-cols-[3fr_5fr] gap-8 page-padding'>
                <div className='w-full align-middle flex flex-col justify-center'>
                    <h2 className='mb-5 heading-2 text-primary-contrast'>What is Bite Size Design?</h2>
                    <p className="text-primary-contrast font-work text-medium">
                        Bite Size Design is a personal studio project focused on creative coding, reusable UI patterns, and frontend experimentation. Every pattern is made with intention—showing how thoughtful design and clean code can work together to scale ideas, not complexity.
                    </p>
                </div>
                <AnimatedIllustration
                    jsonPath="/bite_size_hero3.json"
                    fallbackSrc="/value_prop_illustration.png"
                />

            </div>

        </section>
    )
}