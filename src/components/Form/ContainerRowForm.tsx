interface Props {
  children: React.ReactNode;
}

export const ContainerRowInput = ({ children }: Props) => {

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 max-w-[240px] w-full md:max-w-xl md:justify-between">
      {children}
    </div>
  )
}
