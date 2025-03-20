import Image from "next/image"


export const Logo = () => {
  return (
    <Image 
        src="/logo.svg"
        alt="Logo_cashtrack" 
        width={0} 
        height={0}
        priority 
        className="w-full"
    />
  )
}
