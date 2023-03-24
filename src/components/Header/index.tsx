import Image from 'next/image'

export const Header = () => {
    return (
        <header
            className="flex justify-start w-full mx-auto items-center px-12  bg-[url('/assets/banner.png')] bg-cover bg-center h-[220px]">
            <Image
                src='/assets/logo.svg'
                className=" "
                alt='logo'
                width={200}
                height={50}
                priority
            />
        </header>
    )
}
