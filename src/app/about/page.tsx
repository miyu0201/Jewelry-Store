import Image from "next/image"
import Breadcrumb from "../components/Breadcrumb"

export default function AboutPage() {
    return (
        <main>
            <div className="mx-10 mt-5">   
                <Breadcrumb  items={[{ label: "About Us" }]} />
                </div>
          
            <section className="container max-w-4xl px-4 py-8 mx-auto">
                <h1 className="mb-6 text-4xl font-bold text-center">
                    About Artisan Jewels
                </h1>

                <div className="grid items-center gap-8 mb-12 md:grid-cols-2">
                    <div className="relative h-[300px] w-full">
                        <Image
                            src="/about.jpg"
                            width={500}
                            height={500}
                            alt="Artisan Jewels Community - A group of artisans collaborating on handmade jewelry"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />

                    </div>
                    <div>
                        <p
                            className="mb-4 text-sm text-gray-600 uppercase"
                            aria-hidden="true"
                        >
                            About Artisan Jewels
                        </p>
                        <h2 className="mb-4 text-2xl font-semibold font-montserrat-alternates">
                            Empowering Artisans Worldwide
                        </h2>
                        <p className="mb-4 text-gray-700">
                            Founded in 2023, Artisan Jewels has quickly become the
                            go-to platform for jewelry enthusiasts, artisans,
                            and professional designers to share and discover
                            amazing handcrafted jewelry pieces.
                        </p>
                        <p className="text-gray-700">
                            Our mission is to foster a vibrant community where
                            creativity meets craftsmanship, enabling anyone to
                            bring their jewelry ideas to life through handmade artistry.
                        </p>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" aria-hidden="true" />

            <section className="py-12" aria-labelledby="key-features">
                <div className="px-6 mx-auto max-w-7xl">
                    <h2 id="key-features" className="sr-only">
                        Key Features
                    </h2>
                    <div className="grid gap-6 md:gap-0 md:grid-cols-3">
                        <article className="p-6 bg-white">
                            <h3 className="mb-3 text-xl font-semibold font-montserrat-alternates">
                                1000+ Pieces
                            </h3>
                            <p className="text-gray-600">
                                Access our curated collection of handcrafted jewelry
                                pieces, from elegant necklaces to unique rings.
                            </p>
                        </article>
                        <article className="p-6 bg-white border-gray-400 md:border-x">
                            <h3 className="mb-3 text-xl font-semibold font-montserrat-alternates">
                                Active Community
                            </h3>
                            <p className="text-gray-600">
                                Join thousands of artisans who share techniques, provide
                                feedback, and collaborate on jewelry designs.
                            </p>
                        </article>
                        <article className="p-6 bg-white">
                            <h3 className="mb-3 text-xl font-semibold font-montserrat-alternates">
                                Quality Assured
                            </h3>
                            <p className="text-gray-600">
                                Each piece is carefully crafted with premium materials,
                                with optional custom designs for special occasions.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" aria-hidden="true" />

            <section className="container max-w-3xl px-4 py-8 mx-auto">
                <div className="prose max-w-none">
                    <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
                    <p className="mb-4 text-gray-700">
                        At Artisan Jewels, we believe that handcrafted jewelry is
                        revolutionizing the way we express ourselves and celebrate
                        special moments. Our platform serves as a bridge between
                        artisans and jewelry lovers, enabling the sharing of knowledge
                        and creativity that pushes the boundaries of what&apos;s
                        possible with handmade craftsmanship.
                    </p>
                    <p className="text-gray-700">
                        Whether you&apos;re a jewelry enthusiast looking for your next
                        statement piece, a collector seeking unique designs, or a
                        professional artisan wanting to share your creations,
                        Artisan Jewels provides the tools and community to support
                        your journey in handmade jewelry.
                    </p>
                </div>
            </section>
        </main>
    )
}
