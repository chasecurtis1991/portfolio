import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import Image from "next/image";
import {SectionHeader} from "@/components/SectionHeader";
import {Card} from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
    {
        name: "Chris Nicolaou",
        position: "Artist @ Valence",
        text: "Chase is thorough and makes sure he does a great service by you. He helps you every step of the way and explains what it takes to make a website and what goes into it (that is, finding a domain and web hosting). I recommend him 100%! He’s great 😉",
        avatar: memojiAvatar3,
    },
    {
        name: "Kat",
        position: "Social Media Influencer @ ItsKatKam",
        text: "Chase's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
        avatar: memojiAvatar4,
    },
    {
        name: "Tony Beery",
        position: "Project Manager @ KeyLogic",
        text: "Chase's ability to create seamless user experiences is unmatched. He took our complex product and transformed it into an intuitive and engaging user interface. We couldn't be happier.",
        avatar: memojiAvatar1,
    },
    {
        name: "Brad Love",
        position: "Senior Developer @ McLeod Software",
        text: "Chase is a true frontend wizard. We're already seeing positive feedback from our customers.",
        avatar: memojiAvatar5,
    },
];

export const TestimonialsSection = () => {
    return (
        <div className={"py-16 lg:py-24"}>
            <div className={"container"}>
                <SectionHeader title={"What Clients Say About Me"}
                               eyebrow={"Happy Clients"}
                               description={"Don't just take my word for it. See what my clients have to say about my work."}/>
                <div
                    className={"mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4"}>
                    <div className={"flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]"}>
                        {[...new Array(2)].fill(0).map((_, index) => (
                            <Fragment key={index}>
                                {testimonials.map((testimonial) => (
                                    <Card key={testimonial.name}
                                          className={"max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300"}>
                                        <div className={"flex gap-4 items-center"}>
                                            <div
                                                className={"size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0"}>
                                                <Image src={testimonial.avatar} alt={testimonial.name}
                                                       className={"max-h-full"}/>
                                            </div>
                                            <div>
                                                <div className={"font-semibold"}>{testimonial.name}</div>
                                                <div className={"text-sm text-white/40"}>{testimonial.position}</div>
                                            </div>
                                        </div>
                                        <p className={"mt-4 md:mt-6 text-sm md:text-base"}>{testimonial.text}</p>
                                    </Card>
                                ))}
                            </Fragment>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
};
