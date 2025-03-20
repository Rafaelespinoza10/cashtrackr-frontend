
export default function ErrorMesage({children}: {children: React.ReactNode}) {
  return (
    <p className='text-center my-4 text-xs text-white bg-red-500 font-bold uppercase p-3'> {children}</p>
  )
}
