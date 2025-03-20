
export const SuccessMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <p className='text-center my-4 text-xs text-white bg-amber-600 font-bold uppercase p-3'> {children}</p>
  )
}
